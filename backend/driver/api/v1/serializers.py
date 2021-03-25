from rest_framework import serializers
from django.http import HttpRequest
from core.utils import update_object
from driver.models import Driver


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
        return update_object(Driver(), validated_data)
