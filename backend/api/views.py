from django.shortcuts import render
from datetime import datetime
from django.utils.dateparse import parse_datetime
from django.contrib.auth.models import User
from rest_framework import generics, viewsets, status
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView
from .serializers import UserSerializer, NoteSerializer, BookSerializer, BookListSerializer, UserProfileSerializer,ReadingLogSerializer, GoalLogSerializer, GoalListSerializer, GoalsSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note, Book, BookList, UserProfile, ReadingLog, GoalLog, GoalList, Goals
from rest_framework.response import Response

# Create your views here.

class UserProfileViewSet(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Check if UserProfile exists for the current user
        profile, created = UserProfile.objects.get_or_create(user=request.user)

        # If UserProfile was created, serialize and return it
        if created:
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data)
        
        # If UserProfile already existed, serialize and return it
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)
    
    def put(self, request):
        profile = get_object_or_404(UserProfile, user=request.user)
        
        serializer = UserProfileSerializer(profile, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request):
        # Check if UserProfile already exists for the current user
        existing_profile = UserProfile.objects.filter(user=request.user).exists()
        if existing_profile:
            return Response({"detail": "UserProfile already exists for this user."}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new UserProfile for the current user
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        try:
            profile = UserProfile.objects.get(user=request.user)
            profile.delete()
            return Response({"detail": "UserProfile deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except UserProfile.DoesNotExist:
            return Response({"detail": "UserProfile does not exist for this user."}, status=status.HTTP_404_NOT_FOUND)


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes  = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author = self.request.user)
        else:
            print(serializer.error)

class NoteDelete(generics.DestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    permission_classes = [AllowAny]

    
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookListViewSet(viewsets.ModelViewSet):
    queryset = BookList.objects.all()
    serializer_class = BookListSerializer

class BookListCreate(ListCreateAPIView):
    queryset = BookList.objects.all()
    serializer_class = BookListSerializer
    permission_classes = [IsAuthenticated]  

    def get_queryset(self):
        user = self.request.user
        return BookList.objects.filter(user=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user = self.request.user)
        else:
            print(serializer.error)

class BookListUpdateAPIView(generics.UpdateAPIView):
    queryset = BookList.objects.all()
    serializer_class = BookListSerializer
    
    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class BookCreate(ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def get_queryset(self):
        return Book.objects.all()
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.error)

class BookDetail(RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer



class BookUpdate(UpdateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookDelete(DestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class UsernameByUserId(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_id = kwargs.get('user_id')
        try:
            user = User.objects.get(id=user_id)
            username = user.username
            return Response({'username': username})
        except User.DoesNotExist:
            return Response(status=404, data={'error': 'User not found'})
        

class ReadingLogListCreate(generics.ListCreateAPIView):
    serializer_class = ReadingLogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ReadingLog.objects.filter(user=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)

class ReadingLogDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ReadingLog.objects.all()
    serializer_class = ReadingLogSerializer
    permission_classes = [IsAuthenticated]

class GoalLogListCreate(generics.ListCreateAPIView):
    serializer_class = GoalLogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return GoalLog.objects.filter(user=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)

class GoalLogDetail(UpdateAPIView):
    queryset = GoalLog.objects.all()
    serializer_class = GoalListSerializer



class GoalListCreate(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Extract data from the request
        user = request.user
        name = request.data.get('name')
        goal_ids = request.data.get('goals')  # Assuming goals is a list of goal ids

        # Create a GoalList object
        try:
            goal_list = GoalList.objects.create(user=user, name=name)
            goal_list.goals.add(*goal_ids)  # Associate the GoalLog objects
            serializer = GoalListSerializer(goal_list)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
   


class GoalListDetail(generics.RetrieveAPIView):
    queryset = GoalList.objects.all()
    serializer_class = GoalListSerializer
    permission_classes = [IsAuthenticated]


class GoalListRetrieveAPIView(generics.ListAPIView):
    queryset = GoalList.objects.all()
    serializer_class = GoalListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return GoalList.objects.filter(user=user)


class GoalListUpdate(generics.UpdateAPIView):
    queryset = GoalList.objects.all()
    serializer_class = GoalListSerializer
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        goals = request.data.get('goals', [])
        
        # Assuming you want to completely replace the existing goals with the new ones
        instance.goals.add(*goals)  # Add the new goals
        
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)   
        serializer.save()
        
        return Response(serializer.data)
    
class GoalListCreate(generics.ListCreateAPIView):
    queryset = Goals.objects.all()
    serializer_class = GoalsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        deadline_str = self.request.data.get('deadline')
        if not deadline_str: 
            raise ValueError("Deadline is Required")
        
        deadline = parse_datetime(deadline_str)
        if not deadline:
            raise ValueError("Invalid deadline format")
        if deadline > datetime.now():
            serializer.save(user = self.request.user)
        else: 
            raise ValueError("Deadline must be in the future.")

class GoalDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Goals.objects.all()
    serializer_class = GoalsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)