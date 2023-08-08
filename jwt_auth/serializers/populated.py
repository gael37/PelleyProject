from .common import UserSerializer
from videos.serializers.common import VideoSerializer
from courses.serializers.common import CourseSerializer


class PopulatedUserSerializer(UserSerializer):
    videos_completed = VideoSerializer(many=True)
    courses_completed = CourseSerializer(many=True)
