import random
from django.core.management.base import BaseCommand
from grades.models import Student, Grade
import faker

fake = faker.Faker()

class Command(BaseCommand):
    help = "Generate 12 sample students with grades"

    def handle(self, *args, **kwargs):
        for _ in range(12):
            # Generate fake student data
            first_name = fake.first_name()
            last_name = fake.last_name()
            dob = fake.date_of_birth(minimum_age=18, maximum_age=25)
            student = Student.objects.create(
                student_id=f"{random.randint(100000, 999999)}S",
                first_name=first_name,
                last_name=last_name,
                dob=dob
            )
            
            # Generate grades for 3 modules
            modules = ["Module 1", "Module 2", "Module 3"]
            for module in modules:
                Grade.objects.create(
                    student=student,
                    module_name=module,
                    grade=random.uniform(35, 90)
                )

        self.stdout.write(self.style.SUCCESS('Successfully generated students with grades'))