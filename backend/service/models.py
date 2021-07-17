from decimal import Decimal
from django.db import models
from core.models import TitleImageTimestamp

from .utils import validate_search_params


class CategoryQuerySet(models.QuerySet):
    def search(self, lookup, **kwargs):
        return self.filter(**lookup)


class Category(TitleImageTimestamp):
    domain = models.ForeignKey('domain.Domain', related_name='categories', on_delete=models.CASCADE, blank=True,
                               null=True)
    startingFrom = models.DecimalField(
        max_digits=5, decimal_places=2, default=Decimal("0.0")
    )
    objects = CategoryQuerySet.as_manager()

    def get_startingFrom(self):
        print(self.startingFrom)
        return self.services.filter().values_list('name').annotate(models.Min('price')).order_by('price')[0]
        # (u'First1', 10)


class ServiceQuerySet(models.QuerySet):
    def search(self, lookup, **kwargs):
        search_query = kwargs.get('params', {}).get('search')
        params = validate_search_params(kwargs.get('params', {}))
        queryset = self.filter(**lookup)
        if search_query:
            queryset = queryset.filter(
                models.Q(title__icontains=search_query)
            )
        return queryset.filter(**params)


class Service(TitleImageTimestamp):
    title = models.CharField(max_length=150)
    category = models.ForeignKey('service.Category', on_delete=models.CASCADE, related_name='services')
    description = models.TextField(blank=True, default='')
    shortDescription = models.TextField(blank=True, default='')
    price = models.DecimalField(
        max_digits=5, decimal_places=2, default=Decimal("0.0")
    )
    minQty = models.IntegerField(default=0)
    isActive = models.BooleanField(default=True)
    domain = models.ForeignKey('domain.Domain', related_name='services', on_delete=models.CASCADE, blank=True,
                               null=True)
    objects = ServiceQuerySet.as_manager()
