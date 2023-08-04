from .common import InstructorSerializer
from courses.serializers.common import CourseSerializer


class PopulatedInstructorSerializer(InstructorSerializer):
    courses = CourseSerializer(many=True)
