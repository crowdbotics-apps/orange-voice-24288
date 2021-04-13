from decimal import Decimal
from django.db import models

from core.models import TimestampModel
from .enums import OrderStatusEnum
from .utils import validate_search_order_params

Order_status = (
    (OrderStatusEnum.OrderPlaced.name, OrderStatusEnum.OrderPlaced.value),
    (OrderStatusEnum.PickUp.name, OrderStatusEnum.PickUp.value),
    (OrderStatusEnum.InProgress.name, OrderStatusEnum.InProgress.value),
    (OrderStatusEnum.DropOff.name, OrderStatusEnum.DropOff.value),
    (OrderStatusEnum.Delivered.name, OrderStatusEnum.Delivered.value),
    (OrderStatusEnum.Cancelled.name, OrderStatusEnum.Cancelled.value),
)


class OrderQueryset(models.QuerySet):
    def search(self, lookup, **kwargs):
        search_query = kwargs.get('params', {}).get('search')
        params = validate_search_order_params(kwargs.get('params', {}))
        queryset = self.filter(**lookup)
        if search_query:
            queryset = queryset.filter(
                models.Q(profile__user__first_name__icontains=search_query) |
                models.Q(profile__user__last_name__icontains=search_query)
            )
        return queryset.filter(**params)


class Order(TimestampModel):
    profile = models.ForeignKey('user_profile.Profile', related_name='orders', on_delete=models.CASCADE)
    description = models.TextField(blank=True)
    deliveryAddress = models.TextField(blank=True)
    status = models.CharField('Order status', choices=Order_status, default=OrderStatusEnum.OrderPlaced.value,
                              null=True, blank=True,
                              max_length=25)
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
    address = models.ForeignKey('address.Address', related_name='orders', on_delete=models.CASCADE, blank=True)
    driver = models.ForeignKey('driver.Driver', related_name='orders', on_delete=models.CASCADE, blank=True, null=True)

    objects = OrderQueryset.as_manager()
    domain = models.ForeignKey('domain.Domain', related_name='orders', on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        ordering = ('-modified_on',)


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
