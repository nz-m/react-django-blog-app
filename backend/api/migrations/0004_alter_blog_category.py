# Generated by Django 4.1.2 on 2022-10-19 23:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_comment_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='category',
            field=models.CharField(choices=[('Uncategorized', 'Uncategorized'), ('Technology', 'Technology'), ('Programming', 'Programming'), ('Business', 'Business'), ('Marketing', 'Marketing'), ('Health', 'Health'), ('Travel', 'Travel'), ('Food', 'Food'), ('Fashion', 'Fashion'), ('Sports', 'Sports'), ('Entertainment', 'Entertainment'), ('Lifestyle', 'Lifestyle'), ('Gaming', 'Gaming'), ('Music', 'Music'), ('Movies', 'Movies'), ('TV', 'TV'), ('Books', 'Books'), ('News', 'News'), ('Politics', 'Politics'), ('Science', 'Science'), ('Education', 'Education'), ('Environment', 'Environment'), ('History', 'History'), ('Art', 'Art'), ('Design', 'Design'), ('Photography', 'Photography'), ('Economics', 'Economics'), ('Finance', 'Finance'), ('Law', 'Law'), ('Religion', 'Religion'), ('Philosophy', 'Philosophy')], default='uncategorized', max_length=100),
        ),
    ]
