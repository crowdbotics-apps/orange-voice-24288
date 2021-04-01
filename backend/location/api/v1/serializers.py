from rest_framework import serializers

from core.utils import update_object
from location.models import Location


class LocationSerializers(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = "__all__"

    def update(self, instance, validated_data):
        return update_object(instance, validated_data)

    def create(self, validated_data):
        return update_object(Location(), validated_data)
