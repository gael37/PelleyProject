# Generated by Django 4.2.3 on 2023-07-30 11:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0002_alter_course_ce_credits'),
    ]

    operations = [
        migrations.RenameField(
            model_name='course',
            old_name='images',
            new_name='image',
        ),
        migrations.RenameField(
            model_name='course',
            old_name='trailer_url',
            new_name='trailer',
        ),
        migrations.RenameField(
            model_name='course',
            old_name='video_url',
            new_name='video',
        ),
    ]
