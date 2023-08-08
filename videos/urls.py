from django.urls import path
from .views import VideoListView, VideoDetailView

# for every endpoint you want to create, create a new path
# /products/
urlpatterns = [
    # endpoint is left as an empty string because it's already the correct endpoint for this view when it hits this file. Endpoint: /products/
    path('', VideoListView.as_view()),
    path('<int:pk>/', VideoDetailView.as_view())
]
