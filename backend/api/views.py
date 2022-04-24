from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from .serializers import InstructorSerializer, ClassesSerializer, AbonementSerializer
from .models import Instructor, Classes, Abonement

class AbonementViewSet(ListModelMixin, RetrieveModelMixin, GenericViewSet):
    queryset = Abonement.objects.all()
    serializer_class = AbonementSerializer

class InstructorViewSet(ListModelMixin, RetrieveModelMixin, GenericViewSet):
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer

class ClassesViewSet(ListModelMixin, RetrieveModelMixin, GenericViewSet):
    queryset = Classes.objects.all()
    serializer_class = ClassesSerializer