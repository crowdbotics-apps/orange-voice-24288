from rest_framework import serializers
from django.http import HttpRequest
from django.utils.translation import ugettext_lazy as _
from user_profile.models import Profile
from core.utils import update_object


class ProfileSerializer(serializers.ModelSerializer):
    fullname = serializers.CharField(required=False)

    class Meta:
        model = Profile
        fields = (
            "id",
            "fullname",
            "firstName",
            "lastName",
            "phoneNo",
            "email",
            "postalCode",
            "referralCode",
            "created_on"
        )

    def get_email(self, instance):
        return instance.user.email

    def _get_request(self):
        request = self.context.get("request")
        if (
                request
                and not isinstance(request, HttpRequest)
                and hasattr(request, "_request")
        ):
            request = request._request
        return request

    def validate(self, data):
        return super().validate(data)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        return data

    def update(self, instance, validated_data):
        user = self._get_request().user
        if instance.user.id != user.id:
            raise serializers.ValidationError(
                {"error": _("You can only edit your own profile.")}
            )
        fullname = validated_data.get('fullname', False)
        updated_instance = update_object(instance, validated_data)

        if validated_data.get('fullname'):
            fullname = fullname.split(' ')
            updated_instance.user.first_name = fullname.pop(0)
            updated_instance.user.last_name = " ".join(el for el in fullname)
            updated_instance.user.save()
        return updated_instance

    def create(self, validated_data):
        user = self._get_request().user
        if hasattr(user, 'profile'):
            raise serializers.ValidationError(
                {"error": _("This User has a profile!")}
            )
        profile = Profile(user=user)
        fullname = validated_data.get('fullname', False)
        if fullname:
            fullname = fullname.split(' ')
            profile.user.first_name = fullname.pop(0)
            profile.user.last_name = " ".join(el for el in fullname)
            profile.user.save()
        return profile
