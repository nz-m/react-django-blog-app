from django.db import models
from django.contrib.auth.models import User
from autoslug import AutoSlugField


class Blog(models.Model):

    CHOICES = (
        ('uncategorized', 'uncategorized'),
        ('technology', 'technology'),
        ('sports', 'sports'),
        ('entertainment', 'entertainment'),
        ('business', 'business'),
        ('health', 'health'),
        ('science', 'science'),
        ('travel', 'travel'),
        ('food', 'food'),
        ('fashion', 'fashion'),
        ('lifestyle', 'lifestyle'),
        ('education', 'education'),
        ('music', 'music'),
        ('photography', 'photography'),
        ('gaming', 'gaming'),
        ('movies', 'movies')
    )

    author = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
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
    likes = models.ManyToManyField(User, related_name='blog_posts', blank=True)
    author_name = property(lambda self: self.author.username)

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
            return '< 1 min'
        return str(reading_time) + ' min'

    def delete(self, *args, **kwargs):
        self.image.delete()
        super().delete(*args, **kwargs)


class Comment(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    username = property(lambda self: self.user.username)

    class Meta:
        ordering = ['date']

    def __str__(self):
        return f'Comment {self.body} by {self.user}'

    def date_format(self):
        return self.date.strftime("%d-%b-%y, %I:%M %p")
