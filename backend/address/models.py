from django.db import models
from core.models import AddressModel, TimestampModel

from .utils import validate_search_params


class AddressQuerySet(models.QuerySet):
    def search(self, lookup, **kwargs):
        params = kwargs.get('params', {})
        search_query = params.get('search')
        params = validate_search_params(params)

        queryset = self.filter(**lookup)
        if search_query:
            queryset = queryset.filter(
                # Todo: filter orders
            )
        return queryset.filter(**params)


class Address(AddressModel, TimestampModel):
    profile = models.ForeignKey('user_profile.Profile', related_name='addresses', on_delete=models.CASCADE,
                                blank=True, )
    domain = models.ForeignKey('domain.Domain', related_name='addresses', on_delete=models.CASCADE, blank=True,
                               null=True)
    objects = AddressQuerySet.as_manager()

    class Meta:
        ordering = ("pk",)

    def __str__(self):
        return f'{self.mainAddress}'
