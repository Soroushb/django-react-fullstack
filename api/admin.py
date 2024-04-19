from django.contrib import admin
from .models import Note, Book, BookList

# Register your models here.
admin.site.register(Note)
admin.site.register(Book)
admin.site.register(BookList)