from rest_framework import serializers

from core.utils import update_object
from voucher.models import Voucher


class VoucherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voucher
        fields = "__all__"

    def update(self, instance, validated_data):
        return update_object(instance, validated_data)

    def create(self, validated_data):
        return update_object(Voucher(), validated_data)
