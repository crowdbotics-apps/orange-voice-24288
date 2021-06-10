from rest_framework import serializers
from django.http import HttpRequest

from allauth.utils import email_address_exists, generate_unique_username
from allauth.account.adapter import get_adapter
from django.contrib.auth.models import Group

from core.utils import update_object
from driver.models import Driver
from users.enums import UserGroups
from users.models import User
from user_profile.models import Profile


class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = "__all__"

    def _get_request(self):
        request = self.context.get("request")
        if (
                request
                and not isinstance(request, HttpRequest)
                and hasattr(request, "_request")
        ):
            request = request._request
        return request

    def update(self, instance, validated_data):
        updated_instance = update_object(instance, validated_data)
        return updated_instance

    def create(self, validated_data):
        email = validated_data.get('email')
        password = validated_data.get('license')

        email = get_adapter().clean_email(email)
        if email and email_address_exists(email):
            user = User.objects.get(email=email)
        else:
            user = User(email=email, username=validated_data.get('username', generate_unique_username(
                [validated_data.get("license"), validated_data.get("email"), "user"]
            )), )
            user.set_password(password)
            user.save()

            driver_group = Group.objects.get(name=UserGroups.driver.name)
            user.groups.add(driver_group)

            Profile.objects.create(
                domain_id=self.context.get('domain'),
                user=user,
                phoneNo=validated_data.get('contactNumber'),
            )

        return update_object(Driver(domain_id=self.context.get('domain'), user=user), validated_data)
