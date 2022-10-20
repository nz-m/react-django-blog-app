from django.db import models
from autoslug import AutoSlugField
from django.contrib.auth.models import AbstractUser


class Profile(AbstractUser):
    photo = models.ImageField(
        upload_to='profile/', blank=True, null=True, default='profile/default.png')
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username


class Blog(models.Model):

    CHOICES = (
        ('Uncategorized', 'Uncategorized'),
        ('Technology', 'Technology'),
        ('Programming', 'Programming'),
        ('Business', 'Business'),
        ('Marketing', 'Marketing'),
        ('Health', 'Health'),
        ('Travel', 'Travel'),
        ('Food', 'Food'),
        ('Fashion', 'Fashion'),
        ('Sports', 'Sports'),
        ('Entertainment', 'Entertainment'),
        ('Lifestyle', 'Lifestyle'),
        ('Gaming', 'Gaming'),
        ('Music', 'Music'),
        ('Movies', 'Movies'),
        ('TV', 'TV'),
        ('Books', 'Books'),
        ('News', 'News'),
        ('Politics', 'Politics'),
        ('Science', 'Science'),
        ('Education', 'Education'),
        ('Environment', 'Environment'),
        ('History', 'History'),
        ('Art', 'Art'),
        ('Design', 'Design'),
        ('Photography', 'Photography'),
        ('Economics', 'Economics'),
        ('Finance', 'Finance'),
        ('Law', 'Law'),
        ('Religion', 'Religion'),
        ('Philosophy', 'Philosophy'),
    )

    author = models.ForeignKey(Profile, null=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length=100)
    slug = AutoSlugField(populate_from='title', unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    content = models.TextField()
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    category = models.CharField(
        max_length=100, default='uncategorized', choices=CHOICES)
    publish_status = models.BooleanField(default=True, choices=(
        (True, 'Published'), (False, 'Draft')))
    likes = models.ManyToManyField(
        Profile, related_name='blog_posts', blank=True)
    author_name = property(lambda self: self.author.username)
    author_photo = property(lambda self: self.author.photo.url)
    author_bio = property(lambda self: self.author.bio)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def total_likes(self):
        return self.likes.count()

    def summary(self):
        return self.content[:100]

    def date_created(self):
        return self.created_at.strftime("%d-%b-%y, %I:%M %p")

    def date_updated(self):
        return self.updated_at.strftime("%d-%b-%y, %I:%M %p")

    def reading_time(self):
        total_words = len(self.content.split())
        reading_time = round(total_words/200)
        if reading_time == 0:
            return '<1 min read'
        return str(reading_time) + ' min read'

    def comment_count(self):
        return Comment.objects.filter(blog=self).count()

    def delete(self, *args, **kwargs):
        self.image.delete()
        super().delete(*args, **kwargs)


class Comment(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    body = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    username = property(lambda self: self.user.username)
    user_photo = property(lambda self: self.user.photo.url)

    def __str__(self):
        return f'Comment {self.body} by {self.user}'

    def date_format(self):
        return self.date.strftime("%d-%b-%y, %I:%M %p")
