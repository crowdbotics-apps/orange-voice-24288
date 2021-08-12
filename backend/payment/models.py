from django.db import models
from decimal import Decimal
from core.models import TimestampModel


class Card(models.Model):
    user = models.ForeignKey('users.User', related_name='cards', on_delete=models.CASCADE)
    domain = models.ForeignKey('domain.Domain', related_name='cards', on_delete=models.CASCADE, blank=True, null=True)
    cardNumber = models.CharField(max_length=50)
    expiryMonth = models.CharField(max_length=30)
    expiryYear = models.IntegerField()
    cvvNumber = models.CharField(max_length=10)


class OrderPayment(TimestampModel):
    user = models.ForeignKey('users.User', related_name='payments', on_delete=models.CASCADE)
    domain = models.ForeignKey('domain.Domain', related_name='payments', on_delete=models.CASCADE, blank=True, )
    order = models.ForeignKey('order.Order', related_name='payments', on_delete=models.CASCADE, blank=True, )
    card = models.ForeignKey(Card, related_name='payments', on_delete=models.CASCADE, blank=True, null=True)
    stripe_charge = models.CharField(max_length=50)
    amount = models.DecimalField(max_digits=5, decimal_places=2, default=Decimal("0.0"))
