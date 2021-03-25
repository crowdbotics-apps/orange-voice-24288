from rest_framework import serializers
from django.http import HttpRequest
from core.utils import update_object
from order.models import Order, OrderDetail


class OrderDetailsSerializer(serializers.ModelSerializer):
    order = serializers.SerializerMethodField(required=False)

    class Meta:
        model = OrderDetail
        fields = "__all__"

    def get_order(self, instance):
        return instance.order.id


class OrderSerializer(serializers.ModelSerializer):
    order_details = OrderDetailsSerializer(many=True)  # serializers.SerializerMethodField(required=False)
    address = serializers.SerializerMethodField(required=False)

    class Meta:
        model = Order
        fields = "__all__"

    def get_address(self, instance):
        address = instance.address
        return {
            "userId": 281,
            "type": address.address_type,
            "isPrimary": address.isPrimary,
            "mainAddress": address.mainAddress,
            "street": address.street,
            "suite": address.suite,
            "city": address.city,
            "state": address.state,
            "postalCode": address.postalCode,
            "phone": address.phone,
            "buzzerCode": address.buzzerCode,
            "lng": address.lng,
            "lat": address.lat,
            "isActive": True,
            "id": address.id,
        }

    def get_order_details(self, instance):
        return [{"service": i.service, "quantity": i.quantity, "unitPrice": i.unitPrice} for i in
                instance.order_details.all()]

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
        order_details = validated_data.pop('order_details')

        instance = update_object(Order(), validated_data)

        if order_details:
            for order_detail in order_details:
                order_details_instance = OrderDetail(order=instance)
                update_object(order_details_instance, order_detail)
        return instance
