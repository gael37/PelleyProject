from django.db import models
import datetime


class Course(models.Model):

    title = models.CharField(max_length=100)
    description = models.CharField(max_length=10000)
    trailer = models.CharField(max_length=1000)
    video = models.CharField(max_length=1000)
    length = models.IntegerField()
    CE_credits = models.IntegerField()
    image = models.CharField(max_length=10000)
    created_at = models.DateTimeField(
        auto_now_add=True)
    instructors = models.ManyToManyField(
        'instructors.Instructor',
        related_name='courses',
    )
    categories = models.ManyToManyField(
        'categories.Category',
        related_name="courses"
    )

    def __str__(self):
        return f'{self.title}'
