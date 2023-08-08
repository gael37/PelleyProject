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

    # UPDATE SINGLE course
    def put(self, request, pk):
        course = self.get_course(pk)
        try:
            # We need to add both the instance and the user request body data into the serializer when updating an existing record
            # It will ask for all fields unless you add partial=True
            course_to_update = CourseSerializer(
                course, request.data, partial=True)
            if course_to_update.is_valid():
                course_to_update.save()
                return Response(course_to_update.data, status.HTTP_202_ACCEPTED)
            print(course_to_update.errors)
            return Response(course_to_update.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
