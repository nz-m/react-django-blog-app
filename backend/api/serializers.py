from rest_framework.serializers import ModelSerializer
from .models import Blog, Comment
from django.contrib.auth.models import User
from rest_framework import serializers


class BlogSerializer(ModelSerializer):
    class Meta:
        model = Blog
        fields = [
            'id',
            'title',
            'slug',
            'date_created',
            'date_updated',
            'content',
            'image',
            'category',
            'publish_status',
            'likes',
            'total_likes',
            'summary',
            'author_name',
            'reading_time',
        ]

class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = [
            'id',
            'username',
            'body',
            'date_format'
        ]

class CommentCreateSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = [
            'body',
            'blog',
            'user'
        ]


class UserSerializer(ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']


