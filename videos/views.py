from .models import Video
from .serializers.common import VideoSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework.permissions import IsAuthenticatedOrReadOnly


# Endpoint: /Videos
class VideoListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        videos = Video.objects.all()
        serialized_videos = VideoSerializer(
            videos, many=True)
        return Response(serialized_videos.data, status.HTTP_200_OK)


# Endpoint: /videos/:pk
class VideoDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    # CUSTOM FUNCTION / NOT A CONTROLLER
    def get_videos(self, pk):
        try:
            # Using the get() method we're searching for a record in the videoss table that has a primary key matching the primary key in the captured value of the request
            return Video.objects.get(pk=pk)
        except Video.DoesNotExist as e:
            # The above exceptiom is a Django specific Model error that occurs when the requested resource does not exist.
            print(e)  #  this e variable is an object created by the DoesNotExist class. This is not serializable, so we convert to a string when sending back to the user
            raise NotFound(str(e))
        except Exception as e:
            print(e)
            return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

    # UPDATE SINGLE videos
    # Description: Take the user data and the instance and validate updates before saving
    def put(self, request, pk):
        videos = self.get_videos(pk)
        try:
            # We need to add both the instance and the user request body data into the serializer when updating an existing record
            # It will ask for all fields unless you add partial=True
            videos_to_update = VideoSerializer(
                videos, request.data, partial=True)
            if videos_to_update.is_valid():
                videos_to_update.save()
                return Response(videos_to_update.data, status.HTTP_202_ACCEPTED)
            print(videos_to_update.errors)
            return Response(videos_to_update.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
