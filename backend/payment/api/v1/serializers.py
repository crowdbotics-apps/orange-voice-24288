from rest_framework import serializers
from django.http import HttpRequest
from core.utils import update_object
from payment.models import Card


class CardSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(required=False)
    cardId = serializers.SerializerMethodField(required=False)

    class Meta:
        model = Card
        fields = "__all__"

    def get_user(self, obj):
        return obj.user.id

    def get_cardId(self, instance):
        return instance.id

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
        device_qs = Card.objects.filter(cardNumber=validated_data.get('cardNumber'), user_id=user.id)
        if device_qs.exists():
            return device_qs.first()
        return update_object(Card(user_id=user.id), validated_data)
