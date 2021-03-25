from django.db import models
from core.models import AddressModel, TimestampModel

from .utils import validate_search_params


class Address(AddressModel, TimestampModel):
    profile = models.ForeignKey('user_profile.Profile', related_name='addresses', on_delete=models.CASCADE,
                                blank=True, )

    class Meta:
        ordering = ("pk",)

    @classmethod
    def search(cls, search_query=None, **kwargs):
        params = validate_search_params(kwargs.get('params', {}))

        queryset = cls.objects.all()
        if search_query:
            queryset = queryset.filter(
                # Todo: filter orders
            )
        return queryset.filter(**params)
