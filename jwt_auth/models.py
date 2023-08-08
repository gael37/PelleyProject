from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):

    email = models.CharField(max_length=300, unique=True)
    username = models.CharField(max_length=15, unique=True)
    courses_started = models.ManyToManyField(
        'courses.Course',
        related_name='started_by',
        blank=True
    )
