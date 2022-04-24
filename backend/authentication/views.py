from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import action
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import update_last_login
from rest_framework.exceptions import AuthenticationFailed, ValidationError, NotFound, ParseError
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_201_CREATED
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import TokenError
from .models import CustomUser
from .serializers import UserSerializer
from api.models import Abonement

class UserViewSet(GenericViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    @action(methods=['POST'], detail=False)
    def register(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        password = serializer.validated_data['password']
        if len(password) < 8:
            raise ValidationError({'password': ['Password is too short']})
        serializer.save()

        user = CustomUser.objects.get(email=serializer.validated_data['email'])
        user.set_password(password)
        user.is_active = True
        user.save()

        return Response({'message': 'success'}, status=HTTP_201_CREATED)

    @action(methods=['POST'], detail=False)
    def login(self, request):
        if 'email' not in request.data:
            data = {'email': ['Email must be provided']}
            if 'password' not in request.data:
                data['password'] = ['Password must be provided']
            raise ValidationError(data)
        if 'password' not in request.data:
            raise ValidationError({'password': ['Password must be provided']})

        try:
            user = CustomUser.objects.get(email=request.data.get('email'))
        except CustomUser.DoesNotExist:
            raise NotFound({'message': 'User with provided credentials does not exist'})


        if not user.check_password(request.data.get('password')):
            raise AuthenticationFailed({'message': 'Incorrect password'})

        refresh = RefreshToken.for_user(user)
        update_last_login(None, user)
        response = Response()
        response.set_cookie('refresh', str(refresh))
        response.data = {'access': str(refresh.access_token)}
        return response

    @action(methods=['POST'], detail=False,
)
    def logout(self, request):
        response = Response()
        if 'refresh' not in request.COOKIES or len(request.COOKIES['refresh']) < 1:
            raise AuthenticationFailed({'message': 'Unauthenticated'})

        token = request.COOKIES.get('refresh')
        try:
            token = RefreshToken(token)
            token.blacklist()
        except TokenError:
            raise AuthenticationFailed({'message': 'Cookie is not valid'})

        response.delete_cookie('refresh')
        response.data = {'message': 'success'}
        return response

    @action(methods=['GET'], detail=False,
            permission_classes=[IsAuthenticated])
    def user(self, request):
        user = request.user
        if 'refresh' not in request.COOKIES or len(request.COOKIES['refresh']) < 1:
            raise AuthenticationFailed({'message': 'Unauthenticated'})
        data = UserSerializer(user).data
        return Response(data)

    @action(methods=['POST'], detail=False,
            permission_classes=[IsAuthenticated])
    def add_abonement(self, request):
        user = request.user

        if 'id' not in request.data:
            raise ParseError({'message': 'Id is empty'})

        id=request.data['id']

        try:
            abonement = Abonement.objects.get(id=id)
        except Abonement.DoesNotExist:
            raise NotFound({'message': 'Abonement was not found '})
        user.abonements.add(abonement)
        user.save()
        return Response({'message': 'success'})