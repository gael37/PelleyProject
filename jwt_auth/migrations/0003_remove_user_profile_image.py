# Generated by Django 4.2.3 on 2023-08-04 20:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jwt_auth', '0002_remove_user_date_of_birth_remove_user_postcode_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='profile_image',
        ),
    ]
