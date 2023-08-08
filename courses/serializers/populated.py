from .common import CourseSerializer
from instructors.serializers.common import InstructorSerializer
from videos.serializers.common import VideoSerializer
from categories.serializers.common import CategorySerializer
from jwt_auth.serializers.common import UserSerializer


class PopulatedCourseSerializer(CourseSerializer):

    started_by = UserSerializer(many=True)
    categories = CategorySerializer(many=True)
    instructors = InstructorSerializer(many=True)
    videos = VideoSerializer(many=True)
