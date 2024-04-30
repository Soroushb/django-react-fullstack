from django.contrib import admin
from .models import Note, Book, BookList, UserProfile

# Register your models here.
admin.site.register(Note)
admin.site.register(Book)
admin.site.register(BookList)
admin.site.register(UserProfile)