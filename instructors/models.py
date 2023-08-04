from django.db import models


class Instructor(models.Model):

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    bio = models.CharField(max_length=10000)
    profile_picture = models.CharField(max_length=10000)
    linkedin_url = models.URLField(max_length=10000)
    joined_at = models.DateTimeField(
        auto_now_add=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
