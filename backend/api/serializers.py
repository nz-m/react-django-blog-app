from rest_framework.serializers import ModelSerializer
from .models import Blog, Comment, Profile
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
            'author_photo',
            'author_bio',
            'reading_time',
            'comment_count'
        ]


class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = [
            'id',
            'username',
            'body',
            'date_format',
            'user_photo'
        ]


class CommentCreateSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = [
            'body',
            'blog',
            'user'
        ]


class ProfileSerializer(ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Profile
        fields = [
            'id',
            'username',
            'photo',
            'email',
            'password',
            'bio'
        ]

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password'],
        )
        profile = Profile.objects.create(
            user=user,
            photo=validated_data['photo'],
            bio=validated_data['bio'],
        )
        return profile
