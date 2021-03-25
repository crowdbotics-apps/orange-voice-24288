from decimal import Decimal
from django.db import models

from core.models import TimestampModel


class Order(TimestampModel):
    profile = models.ForeignKey('user_profile.Profile', related_name='orders', on_delete=models.CASCADE)
    description = models.TextField(blank=True)
    deliveryAddress = models.TextField(blank=True)
    orderAmount = models.DecimalField(
        max_digits=5, decimal_places=2, default=Decimal("0.0")
    )
    totalAmount = models.DecimalField(
        max_digits=5, decimal_places=2, default=Decimal("0.0")
    )
    discountAmount = models.DecimalField(
        max_digits=5, decimal_places=2, default=Decimal("0.0")
    )
    taxPercentage = models.DecimalField(
        max_digits=5, decimal_places=2, default=Decimal("0.0")
    )
    feedbackRating = models.IntegerField(blank=True, default=0)

    pickupTime = models.CharField(max_length=150)
    dropoffTime = models.CharField(max_length=150)
    dropoffDate = models.DateTimeField(blank=True, null=True)
    pickupDate = models.DateTimeField(blank=True, null=True)
    address = models.ForeignKey('address.Address', related_name='orders', on_delete=models.CASCADE)

    @classmethod
    def search(cls, search_query=None, **kwargs):
        queryset = cls.objects.all()
        if search_query:
            queryset = queryset.filter(
                # Todo: filter orders
            )
        return queryset


class OrderDetail(models.Model):
    order = models.ForeignKey(Order, related_name='order_details', on_delete=models.CASCADE)
    service = models.ForeignKey('service.Service', related_name='order_details', on_delete=models.CASCADE)
    quantity = models.IntegerField()
    unitPrice = models.DecimalField(
        max_digits=5, decimal_places=2, default=Decimal("0.0")
    )
    amount = models.DecimalField(
        max_digits=5, decimal_places=2, default=Decimal("0.0")
    )
