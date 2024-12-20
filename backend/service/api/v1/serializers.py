from rest_framework import serializers
from django.http import HttpRequest
from core.utils import update_object
from service.models import Service, Category
from django.db import models


class CategorySerializer(serializers.ModelSerializer):
    startingFrom = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = "__all__"

    def get_startingFrom(self, instance):
        try:
            res = instance.services.filter().annotate(models.Min('price')).order_by('price')[0]
            return res.price__min
        except:
            return 0

    def create(self, validated_data):
        return update_object(Category(domain_id=self.context.get('domain')), validated_data)


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
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
        return update_object(Service(domain_id=self.context.get('domain')), validated_data)
