from enum import Enum


class CouponType(Enum):
    Promo = 'Promo'
    Referral = 'Referral'


class OfferType(Enum):
    Percentage = 'Percentage'
    Amount = 'Amount'
