from rest_framework import serializers
from django.http import HttpRequest
from core.utils import update_object
from order.models import Order, OrderDetail
from address.models import Address


class OrderDetailsSerializer(serializers.ModelSerializer):
    order = serializers.SerializerMethodField(required=False)
    service__title = serializers.SerializerMethodField()

    class Meta:
        model = OrderDetail
        fields = "__all__"

    def get_service__title(self, instance):
        return instance.service.title

    def get_order(self, instance):
        return instance.order.id


class ReadWriteSerializerMethodField(serializers.SerializerMethodField):
    def __init__(self, method_name=None, **kwargs):
        self.method_name = method_name
        kwargs['source'] = '*'
        super(serializers.SerializerMethodField, self).__init__(**kwargs)

    def to_internal_value(self, data):
        return {self.field_name: data}


class OrderSerializer(serializers.ModelSerializer):
    order_details = OrderDetailsSerializer(many=True)  # serializers.SerializerMethodField(required=False)
    address = ReadWriteSerializerMethodField(required=False)
    firstName = serializers.SerializerMethodField()
    lastName = serializers.SerializerMethodField()
    phoneNo = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = "__all__"

    def get_firstName(self, instance):
        return instance.profile.firstName()

    def get_lastName(self, instance):
        return instance.profile.lastName()

    def get_phoneNo(self, instance):
        return instance.profile.phoneNo

    def get_email(self, instance):
        return instance.profile.user.email

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

    def validate_address(self, address):
        if not address:
            raise serializers.ValidationError(
                "Please select address"
            )

        return address

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
        validated_data.pop('order_details')
        updated_instance = update_object(instance, validated_data)
        return updated_instance

    def create(self, validated_data):
        order_details = validated_data.pop('order_details')
        address = Address.objects.get(id=validated_data.pop('address'))

        instance = update_object(Order(address=address), validated_data)

        if order_details:
            for order_detail in order_details:
                order_details_instance = OrderDetail(order=instance)
                update_object(order_details_instance, order_detail)
        return instance