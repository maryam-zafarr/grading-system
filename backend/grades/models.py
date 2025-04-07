from django.db import models

class Student(models.Model):
    student_id = models.CharField(max_length=10, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    dob = models.DateField()

    def average_grade(self):
        grades = self.grades.all()
        total_grades = sum(grade.grade for grade in grades)
        return total_grades / len(grades) if grades else 0

    def grade_category(self):
        avg_grade = self.average_grade()
        if avg_grade >= 70:
            return 'Distinction'
        elif avg_grade >= 60:
            return 'Merit'
        elif avg_grade >= 40:
            return 'Pass'
        else:
            return 'Fail'

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.student_id})"


class Grade(models.Model):
    student = models.ForeignKey(Student, related_name='grades', on_delete=models.CASCADE)
    module_name = models.CharField(max_length=100)
    grade = models.FloatField()

    def __str__(self):
        return f"{self.module_name}: {self.grade}%"