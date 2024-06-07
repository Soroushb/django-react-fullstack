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
    path('update-user/', views.UserUpdateView.as_view(), name='update-user'),
    path('reading-logs/', views.ReadingLogListCreate.as_view(), name='reading-log-list-create'),
    path('reading-logs/<int:pk>/', views.ReadingLogDetail.as_view(), name='reading-log-detail'),
    path('goal-logs/', views.GoalLogListCreate.as_view(), name='goal-log-list-create'),
    path('goal-logs/<int:pk>/', views.GoalLogDetail.as_view(), name='goal-log-detail'),
    path('goal-logs/<int:pk>/delete/', views.GoalLogDelete.as_view(), name='goal-log-delete'),
    path('goal-lists/', views.GoalListCreate.as_view(), name='goal-list-create'),
    path('goal-lists/retrieve/', views.GoalListRetrieveAPIView.as_view(), name='goal-list-retrieve'),
    path('goal-lists/<int:pk>/', views.GoalListDetail.as_view(), name='goal-list-detail'),
    path('goal-lists/update/<int:pk>/', views.GoalListUpdate.as_view(), name='goal-list-update'),
    path("profile/", views.UserProfileViewSet.as_view(), name="user_profile"),
    path("goals/", views.GoalListCreate.as_view(), name="goal-list-create"),
    path("goals/<int:pk>/", views.GoalDetail.as_view(), name="goal-detail"),
]
