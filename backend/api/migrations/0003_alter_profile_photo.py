# Generated by Django 4.1.2 on 2022-10-20 04:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_profile_phone_remove_profile_website'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='photo',
            field=models.ImageField(blank=True, default='profile/default.png', null=True, upload_to='profile/'),
        ),
    ]
