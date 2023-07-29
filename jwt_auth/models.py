from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):

    email = models.CharField(max_length=300, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    profile_image = models.CharField(
        max_length=400, default=None, blank=True, null=True)
    postcode = models.CharField(
        max_length=10, default=None, blank=True, null=True)
    title = models.CharField(max_length=300)
    date_of_birth = models.DateField(
        max_length=15, default=None, blank=True, null=True)
    courses_completed = models.IntegerField(
        max_length=3, default=None, blank=True, null=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}, as {self.username}'
