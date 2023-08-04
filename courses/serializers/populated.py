from .common import CourseSerializer
from instructors.serializers.common import InstructorSerializer
from categories.serializers.common import CategorySerializer
from jwt_auth.serializers.common import UserSerializer


class PopulatedCourseSerializer(CourseSerializer):

    completed_by = UserSerializer(many=True)
    started_by = UserSerializer(many=True)
    categories = CategorySerializer(many=True)
    instructors = InstructorSerializer(many=True)
