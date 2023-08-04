from .common import CategorySerializer
from courses.serializers.common import CourseSerializer


class PopulatedCategorySerializer(CategorySerializer):
    courses = CourseSerializer(many=True)
