from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
# Create your models here.
def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/profile_pics/user_<id>/<filename>
    return f"profile_pics/user_{instance.user.id}/{filename}"

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    picture = models.ImageField(upload_to=user_directory_path, blank=True)

    def __str__(self):
        return self.user.username
    
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


class ReadingLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(default=timezone.now, unique=True)
    mins_read = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"Reading Log for {self.user.username} on {self.date}"
    

class GoalLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    date = models.DateField(default=timezone.now)  # removed unique=True
    mins_done = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"Goal for {self.user.username} on {self.date}"

class GoalList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    goal = models.ForeignKey(GoalLog, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username}'s Goal List: {self.goal.name}"