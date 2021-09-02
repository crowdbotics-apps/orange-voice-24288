from rest_framework import serializers
from domain.models import Domain
from core.utils import update_object


class DomainSeriazer(serializers.ModelSerializer):
    users = serializers.SerializerMethodField()

    class Meta:
        model = Domain
        fields = "__all__"

    def get_users(self, instance):
        return []

    def update(self, instance, validated_data):
        return update_object(instance, validated_data)

    def create(self, validated_data):
        return Domain()
