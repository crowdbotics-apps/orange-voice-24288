from django.db import models
from core.models import TimestampModel

from .enum import CouponType, OfferType

Coupon_type = (
    (CouponType.Promo.name, CouponType.Promo.value),
    (CouponType.Referral.name, CouponType.Referral.value),
)

Offer_type = (
    (OfferType.Amount.name, OfferType.Amount.value),
    (OfferType.Percentage.name, OfferType.Percentage.value),
)


class VoucherQueryset(models.QuerySet):
    def search(self, lookup, **kwargs):
        search_query = kwargs.get('params', {}).get('search')
        queryset = self.filter(**lookup)
        if search_query:
            queryset = queryset.filter(
                code__icontains=search_query
            )
        return queryset


class Voucher(TimestampModel):
    code = models.CharField(max_length=120, blank=True, null=True)
    validFrom = models.DateTimeField(auto_now_add=True, )
    validTo = models.DateTimeField(auto_now_add=True, )
    couponType = models.CharField(choices=Coupon_type, default=CouponType.Promo.value,
                                  null=True, blank=True,
                                  max_length=25)
    offerType = models.CharField(choices=Offer_type, default=OfferType.Amount.value,
                                 null=True, blank=True,
                                 max_length=25)
    offerValue = models.IntegerField()
    maxRedeem = models.IntegerField()
    numberRedeem = models.IntegerField()
    minProduct = models.IntegerField()
    minAmount = models.IntegerField()
    isActive = models.BooleanField(default=True)
    objects = VoucherQueryset.as_manager()
    domain = models.ForeignKey('domain.Domain', related_name='vouchers', on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        ordering = ('-pk',)
