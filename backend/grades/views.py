from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .models import Student, Grade
from .serializers import StudentSerializer, GradeSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    @action(detail=False, methods=['get'])
    def average_results(self, request):
        # Get selected student IDs from query params, if provided
        student_ids = request.query_params.getlist('student_ids', [])

        # Fetch students based on provided IDs, or fetch all students
        if student_ids:
            students = Student.objects.filter(student_id__in=student_ids)
        else:
            students = Student.objects.all()

        # Prepare the result data for individual students
        result = []
        total_grades = 0
        total_count = 0

        for student in students:
            grades_data = []
            for grade in student.grades.all():
                grades_data.append({
                    "module_name": grade.module_name,
                    "grade": grade.grade
                })
            
            # Calculate average grade and classification
            average_grade = student.average_grade()
            total_grades += sum([grade.grade for grade in student.grades.all()])
            total_count += len(student.grades.all())

            result.append({
                "student_id": student.student_id,
                "first_name": student.first_name,
                "last_name": student.last_name,
                "dob": student.dob.strftime('%d/%m/%Y'),
                "grades": grades_data,
                "average_grade": average_grade,
                "classification": student.grade_category(),
            })

        # Calculate class average for all students or selected ones
        class_average = total_grades / total_count if total_count > 0 else 0

        # Prepare the response
        response_data = {
            "class_average": class_average,
            "students": result
        }

        # Add the class average for selected students (if applicable)
        if student_ids:
            selected_class_average = total_grades / total_count if total_count > 0 else 0
            response_data["selected_class_average"] = selected_class_average

        return Response(response_data)

    def create(self, request, *args, **kwargs):
        student_data = request.data.get('student', {})
        grades_data = request.data.get('grades', [])

        student_serializer = self.get_serializer(data=student_data)
        if student_serializer.is_valid():
            student = student_serializer.save()

            # Add grades to the student
            for grade in grades_data:
                Grade.objects.create(student=student, **grade)

            return Response(student_serializer.data, status=status.HTTP_201_CREATED)

        return Response(student_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
