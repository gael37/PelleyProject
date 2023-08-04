from django.urls import path
from .views import CourseListView, CourseDetailView

# for every endpoint you want to create, create a new path
# /products/
urlpatterns = [
    # endpoint is left as an empty string because it's already the correct endpoint for this view when it hits this file. Endpoint: /products/
    path('', CourseListView.as_view()),
    path('<int:pk>/', CourseDetailView.as_view())
]
