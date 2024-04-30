from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, Book, BookList, UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['bio', 'picture']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class NoteSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class BookListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookList
        fields = '__all__'