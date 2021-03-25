from rest_framework import serializers
from django.http import HttpRequest
from core.utils import update_object
from address.models import Address


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
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
        return update_object(Address(), validated_data)
