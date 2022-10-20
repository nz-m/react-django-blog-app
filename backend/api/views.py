from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from .models import Blog, Comment, Profile
from .serializers import BlogSerializer, CommentSerializer, ProfileSerializer, CommentCreateSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getBlogs(request):
    category = request.GET.get('category', None)
    if category is not None:
        blogs = Blog.objects.filter(category=category)
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data)
    else:
        blogs = Blog.objects.all()
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def getBlog(request, pk):
    blog = Blog.objects.get(pk=pk)
    blogSerializer = BlogSerializer(blog, many=False)
    return Response(blogSerializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyBlogs(request):
    user = request.user
    blogs = Blog.objects.filter(author=user)
    serializer = BlogSerializer(blogs, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createBlog(request):
    data = request.data
    user = Profile.objects.get(id=data['author'])
    serializer = BlogSerializer(data=data)
    if serializer.is_valid():
        serializer.save(author=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateBlog(request, pk):
    data = request.data
    blog = Blog.objects.get(pk=pk)
    serializer = BlogSerializer(instance=blog, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteBlog(request, pk):
    blog = Blog.objects.get(pk=pk)
    blog.delete()
    return Response('Item successfully deleted!', status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def getComments(request, pk):
    comments = Comment.objects.filter(blog=pk)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createComment(request):
    data = request.data
    blog = Blog.objects.get(id=data['blog'])
    serializer = CommentCreateSerializer(data=data)
    if serializer.is_valid():
        serializer.save(blog=blog)
        comment = Comment.objects.latest('id')
        commentSerializer = CommentSerializer(comment, many=False)
        return Response(commentSerializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteComment(request, pk):
    comment = Comment.objects.get(pk=pk)
    comment.delete()
    return Response('Item successfully deleted!', status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = Profile.objects.create_user(
            username=data['username'],
            email=data['email'],
            password=data['password'],
            photo=data['photo'],
            bio=data['bio']
        )
        serializer = ProfileSerializer(user, many=False)
        return Response(serializer.data)

    except:
        message = {'detail': 'Profile with this username already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getCategory(request):
    return JsonResponse([category[1] for category in Blog.CHOICES], safe=False)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addLike(request, pk):
    blog = Blog.objects.get(pk=pk)
    blog.likes.add(request.data['user'])
    blog.save()
    serializer = BlogSerializer(blog, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def removeLike(request, pk):
    blog = Blog.objects.get(pk=pk)
    blog.likes.remove(request.data['user'])
    blog.save()
    serializer = BlogSerializer(blog, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProfile(request, pk):
    user = Profile.objects.get(pk=pk)
    serializer = ProfileSerializer(user, many=False)
    return Response(serializer.data)

