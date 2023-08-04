from .models import Course
from .serializers.common import CourseSerializer
from .serializers.populated import PopulatedCourseSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework.permissions import IsAuthenticatedOrReadOnly


# Endpoint: /courses
class CourseListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        courses = Course.objects.all()
        serialized_courses = PopulatedCourseSerializer(courses, many=True)
        return Response(serialized_courses.data, status.HTTP_200_OK)


# Endpoint: /courses/:pk
class CourseDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    # CUSTOM FUNCTION
    def get_course(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist as e:
            print(e)
            raise NotFound(str(e))
        except Exception as e:
            print(e)
            return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

    # GET SINGLE Course
    def get(self, _request, pk):
        course = self.get_course(pk)
        serialized_course = PopulatedCourseSerializer(course)
        return Response(serialized_course.data)
