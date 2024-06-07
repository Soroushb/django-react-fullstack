from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, Book, BookList, UserProfile, ReadingLog, GoalLog, GoalList,  DayPlan, Goals
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['bio', 'picture', 'user']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        username = validated_data.get('username')
        if User.objects.filter(username__iexact=username).exists():
            raise ValidationError(f"User with username '{username}' already exists.")
    
        user = User.objects.create_user(**validated_data)
        return user
    
    def update(self, instance, validated_data):
        username = validated_data.get('username', instance.username)
        if User.objects.filter(username__iexact=username).exclude(id=instance.id).exists():
            raise ValidationError(f"User with username '{username}' already exists.")
        
        instance.username = username
        instance.password = instance.password
        instance.save()
        return instance
    
    

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
    
class GoalLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoalLog
        fields = ['id' ,'name' ,'mins_done', 'date']

class GoalListSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(default=serializers.CurrentUserDefault(), read_only=True)
    class Meta:
        model = GoalList
        fields = '__all__'

class DayPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = DayPlan
        fields = '__all__'



class GoalsSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Goals
        fields = '__all__'
        read_only_fields = ['user']  # Make user field read-only