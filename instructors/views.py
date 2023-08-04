from .models import Instructor
from .serializers.common import InstructorSerializer
from .serializers.populated import PopulatedInstructorSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework.permissions import IsAuthenticatedOrReadOnly


# Endpoint: /instructors
class InstructorListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        instructors = Instructor.objects.all()
        serialized_instructors = PopulatedInstructorSerializer(
            instructors, many=True)
        return Response(serialized_instructors.data, status.HTTP_200_OK)
