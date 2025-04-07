from rest_framework import serializers
from .models import Student, Grade

class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ['module_name', 'grade']

class StudentSerializer(serializers.ModelSerializer):
    dob = serializers.DateField(format="%d/%m/%Y", input_formats=["%d/%m/%Y"])
    grades = GradeSerializer(many=True, read_only=True)

    class Meta:
        model = Student
        fields = ['student_id', 'first_name', 'last_name', 'dob', 'grades']