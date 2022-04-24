from rest_framework.serializers import ModelSerializer
from .models import Instructor, Classes, Timetable, Access, Abonement

class AccessSerializer(ModelSerializer):
    class Meta:
        model = Access
        fields = '__all__'

class AbonementSerializer(ModelSerializer):
    access_info = AccessSerializer(source='type_of_access', many=True)
    class Meta:
        model = Abonement
        exclude = ['type_of_access', ]

class TimetableSerializer(ModelSerializer):
    class Meta:
        model = Timetable
        fields = '__all__'

class ClassesSerializer(ModelSerializer):
    timetables_info = TimetableSerializer(source='timetables', many=True)
    class Meta:
        model = Classes
        exclude = ['timetables', ]

class InstructorSerializer(ModelSerializer):
    class Meta:
        model = Instructor
        fields = '__all__'