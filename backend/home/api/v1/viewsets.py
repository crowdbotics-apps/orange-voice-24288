import random
import requests

from rest_framework import viewsets, status, serializers, authentication
from allauth.utils import generate_unique_username, email_address_exists
from rest_framework.views import APIView
from .serializers import CustomTextSerializer, HomePageSerializer, TokenSerializer
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_auth.registration.views import RegisterView, LoginView
from rest_auth.views import PasswordResetView
from users.models import User
from allauth.account.models import EmailAddress

from home.api.v1.serializers import (
    SignupSerializer,
    CustomTextSerializer,
    HomePageSerializer,
    UserSerializer,
)
from home.models import CustomText, HomePage


class SignupViewSet(ModelViewSet):
    serializer_class = SignupSerializer
    http_method_names = ["post"]


class LoginViewSet(ViewSet):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""

    serializer_class = AuthTokenSerializer

    def create(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)
        return Response({"token": token.key, "user": user_serializer.data})


class CustomTextViewSet(ModelViewSet):
    serializer_class = CustomTextSerializer
    queryset = CustomText.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAdminUser]
    http_method_names = ["get", "put", "patch"]


class HomePageViewSet(ModelViewSet):
    serializer_class = HomePageSerializer
    queryset = HomePage.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAdminUser]
    http_method_names = ["get", "put", "patch"]


class RegisterViewToken(RegisterView):
    authentication_classes = ()


class LoginViewToken(LoginView):
    authentication_classes = ()


class ResetPasswordViewToken(PasswordResetView):
    authentication_classes = ()


class SignupAPIView(APIView):
    permission_classes = (AllowAny,)

    authentication_classes = ()
    profile_url = 'https://graph.facebook.com/me'

    def post(self, request):
        token = request.data.get('token')
        resp = requests.get(
            self.profile_url,
            params={"access_token": token, "fields": "email", "alt": "json"},
        )
        if resp.json().get('error'):
            raise serializers.ValidationError(
                resp.json().get('error', {}).get('message'))
        email = resp.json().get('email')
        if email and email_address_exists(email):
            user = User.objects.get(email=email)
        else:
            user = User(
                email=email,
                username=generate_unique_username([
                    '',
                    email,
                    'user'
                ])
            )

            user.verification_code = random.randint(1000, 9999)
            user.set_password(f'xxxxxxxx{user.verification_code}')
            user.save()
            EmailAddress.objects.get_or_create(user=user, email=user.email, verified=True, primary=True)
        token, _ = Token.objects.get_or_create(user=user)

        return Response(data=TokenSerializer(token).data, status=status.HTTP_201_CREATED)
