from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    picture = models.ImageField(upload_to='profile_pics', blank=True)

class Note(models.Model):
    title = models.CharField(max_length = 100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add = True)
    author = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "notes")

    def __str__(self):
        return self.title
    

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    published_year = models.PositiveIntegerField()
    rating = models.DecimalField(decimal_places=2, max_digits=5, default=0)
    ratings = models.PositiveIntegerField(default=0)
    smallImageURL = models.CharField(max_length=500, default="")
    url = models.CharField(max_length=500, default="")


class BookList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    list_type = models.CharField(max_length=20)  #'favorite', 'to_read', 'finished'

