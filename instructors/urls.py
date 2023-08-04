from django.urls import path
from .views import InstructorListView

# for every endpoint you want to create, create a new path
# /products/
urlpatterns = [
    # endpoint is left as an empty string because it's already the correct endpoint for this view when it hits this file. Endpoint: /products/
    path('', InstructorListView.as_view()),
]
