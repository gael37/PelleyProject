from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Exceptions to raise
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model

from .serializers.common import UserSerializer

# modules
from datetime import datetime, timedelta
import jwt

# import settings module
#  from here we can get our SECRET_KEY to pass into our token
from django.conf import settings

User = get_user_model()


class RegisterView(APIView):

    def post(self, request):
        try:
            # 1. Taking the user data and validating it
            user_to_register = UserSerializer(data=request.data)
            if user_to_register.is_valid():
                user_to_register.save()
                return Response('Registration successful', status.HTTP_201_CREATED)
            return Response(user_to_register.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            print(e)
            return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoginView(APIView):

    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        try:
            user_to_login = User.objects.get(email=email)
        except User.DoesNotExist as e:
            print(e)
            raise PermissionDenied('Invalid Credentials')

        # Django includes a check_password method on request object instances that allows us to pass a plain text password and check if it matches the hashed password stored on the record in the database
        # This method returns a boolean, so no need for a try except
        if not user_to_login.check_password(password):
            print('PASSWORD INCORRECT')
            raise PermissionDenied('Invalid Credentials')

        # Here we will build up a date that is 7 days in the future
        # To do this, we'll need to get todays date with datetime module
        # And we'll add this to a timestamp representing 7 days that we get with timedelta
        # to to select an amount of time from timedelta use keyword arguments for seconds, minutes, hours, days etc
        dt = datetime.now() + timedelta(days=7)
        dt_as_seconds = int(dt.strftime('%s'))
        token = jwt.encode(
            {'sub': user_to_login.id, 'exp': dt_as_seconds},
            settings.SECRET_KEY,
            'HS256'
        )
        print(token)
        return Response({
            'token': token,
            'message': f'Welcome back, {user_to_login.username}'
        }, status.HTTP_202_ACCEPTED)
