from rest_framework import serializers
from django.http import HttpRequest
from core.utils import update_object
from device.models import Device


class DeviceSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(required=False)

    class Meta:
        model = Device
        fields = "__all__"

    def get_user(self, obj):
        return obj.user.id

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
        if self._get_request().user != instance.user:
            return instance
        updated_instance = update_object(instance, validated_data)
        return updated_instance

    def create(self, validated_data):
        user = self._get_request().user
        device_qs = Device.objects.filter(player_id=validated_data.get('player_id'), user_id=user.id)
        if device_qs.exists():
            return device_qs.first()
        return update_object(Device(user_id=user.id), validated_data)
