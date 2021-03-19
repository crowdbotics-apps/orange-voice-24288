from django.contrib.auth import get_user_model
from django.http import HttpRequest
from django.utils.translation import ugettext_lazy as _
from allauth.account import app_settings as allauth_settings
from allauth.account.forms import ResetPasswordForm
from allauth.utils import email_address_exists, generate_unique_username
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_auth.serializers import PasswordResetSerializer
from home.models import CustomText, HomePage
from user_profile.models import Profile

User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(required=False)
    postal_code = serializers.CharField(required=False)
    referral_code = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = (
            "id",
            "last_name",
            "first_name",
            "phone_number",
            "email",
            "password",
            "postal_code",
            "referral_code"
        )
        extra_kwargs = {
            "password": {"write_only": True, "style": {"input_type": "password"}},
            "email": {
                "required": True,
                "allow_blank": False,
            },
        }

    def _get_request(self):
        request = self.context.get("request")
        if (
                request
                and not isinstance(request, HttpRequest)
                and hasattr(request, "_request")
        ):
            request = request._request
        return request

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address.")
                )
        return email

    def create(self, validated_data):
        user = User(
            email=validated_data.get("email"),
            first_name=validated_data.get("first_name"),
            last_name=validated_data.get("last_name"),
            username=generate_unique_username(
                [validated_data.get("name"), validated_data.get("email"), "user"]
            ),
        )
        user.set_password(validated_data.get("password"))
        user.save()
        Profile.objects.create(
            user=user,
            phone_number=validated_data.get('phone_number'),
            postal_code=validated_data.get('postal_code'),
            referral_code=validated_data.get('referral_code'),
        )
        request = self._get_request()
        setup_user_email(request, user, [])
        return user

    def save(self, request=None):
        """rest_auth passes request so we must override to accept it"""
        return super().save()


class CustomTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomText
        fields = "__all__"


class HomePageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomePage
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "name"]


class PasswordSerializer(PasswordResetSerializer):
    """Custom serializer for rest_auth to solve reset password error"""

    password_reset_form_class = ResetPasswordForm


class TokenSerializer(serializers.ModelSerializer):
    profile_id = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()
    firstName = serializers.SerializerMethodField()
    lastName = serializers.SerializerMethodField()
    token = serializers.SerializerMethodField()

    class Meta:
        model = Token
        fields = ('token', 'user', 'firstName', 'lastName', 'profile_id', 'role')

    def get_role(self, instance):
        return 'Admin'  # TODO: get role from user groups

    def get_firstName(self, _):
        return self.instance.user.first_name

    def get_lastName(self, _):
        return self.instance.user.last_name

    def get_token(self, instance):
        return instance.key
