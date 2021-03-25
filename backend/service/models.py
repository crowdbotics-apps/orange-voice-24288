from decimal import Decimal
from django.db import models
from core.models import TitleImageTimestamp

from .utils import validate_search_params

class Category(TitleImageTimestamp):
    pass


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

    @classmethod
    def search(cls, search_query=None, **kwargs):
        params = validate_search_params(kwargs.get('params', {}))
        queryset = cls.objects.all()
        if search_query:
            queryset = queryset.filter(
                models.Q(title__icontains=search_query)
            )
        return queryset.filter(**params)
