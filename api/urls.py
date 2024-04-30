from django.urls import path
from . import views


urlpatterns = [

    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>", views.NoteDelete.as_view(), name="delete-note"),
    path("books/", views.BookListCreate.as_view(), name="book-list"),
    path('booklist/<int:pk>/update/', views.BookListUpdateAPIView.as_view(), name='booklist-update'),
    path("book/", views.BookCreate.as_view(), name="book-create"),
    path("books/<int:pk>/", views.BookDetail.as_view(), name="book-detail"),
    path("books/<int:pk>/update/", views.BookUpdate.as_view(), name="book-update"),
    path("books/<int:pk>/delete/", views.BookDelete.as_view(), name="book-delete"),
    path("users/<int:user_id>", views.UsernameByUserId.as_view(), name="user"),
    path("profile/", views.UserProfileViewSet.as_view(), name="user_profile"),
    
]