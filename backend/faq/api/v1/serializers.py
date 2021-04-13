from rest_framework import serializers
from core.utils import update_object
from faq.models import Faq


class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = Faq
        fields = "__all__"

    def create(self, validated_data):
        return update_object(Faq(domain_id=self.context.get('domain')), validated_data)

    def update(self, instance, validated_data):
        return update_object(instance, validated_data)
