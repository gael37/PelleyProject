from django.db import models
import datetime


class Video(models.Model):
    name = models.CharField(max_length=200)
    url = models.CharField(max_length=1000)
    length = models.IntegerField()
    order = models.IntegerField()
    created_at = models.DateTimeField(
        auto_now_add=True)
    course = models.ForeignKey(
        'courses.Course',
        related_name='videos',
        on_delete=models.CASCADE,
        blank=True
    )
    video_viewed_by = models.ManyToManyField(
        'jwt_auth.User',
        related_name='videos_completed',
        blank=True
    )

    def __str__(self):
        return f"{self.name}"
