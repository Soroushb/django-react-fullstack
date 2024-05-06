from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, Book, BookList, UserProfile, ReadingLog

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

class ReadingLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReadingLog
        fields = ['mins_read', 'date', 'user']
        read_only_fields = ['user']  # Set the user field to read-only

    def validate(self, attrs):
        attrs['user'] = self.context['request'].user  # Set the user based on the request user
        return attrs