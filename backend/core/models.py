import os
from django.db import models

from .enums import AddressTypeEnum


def media_directory(instance, filename):
    return os.path.join('media/media_%s' % instance.id, filename)


class TimestampModel(models.Model):
    created_on = models.DateTimeField(
        auto_now_add=True,
    )

    modified_on = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        abstract = True


class TitleImageModel(models.Model):
    title = models.CharField(max_length=60)
    image = models.FileField(default=None, upload_to=media_directory, null=True, blank=True)

    class Meta:
        abstract = True


class TitleImageTimestamp(TitleImageModel, TimestampModel):
    class Meta:
        abstract = True


Address_type = (
    (AddressTypeEnum.residential.name, AddressTypeEnum.residential.value),
)


class AddressModel(models.Model):
    lng = models.CharField(max_length=256, blank=True)
    lat = models.CharField(max_length=256, blank=True)
    state = models.CharField(max_length=256, blank=True)
    mainAddress = models.CharField(max_length=256, blank=True)
    street = models.CharField(max_length=256, blank=True)
    city = models.CharField(max_length=256, blank=True)
    postalCode = models.CharField(max_length=20, blank=True)
    buzzerCode = models.CharField(max_length=20, blank=True)
    country = models.CharField(max_length=128, blank=True)
    phone = models.CharField(max_length=20, blank=True, default="")
    suite = models.CharField(max_length=20, blank=True, default="")
    address_type = models.CharField(choices=Address_type, default=AddressTypeEnum.residential.name, null=True,
                                    blank=True, max_length=150)
    isPrimary = models.BooleanField(default=False)

    class Meta:
        abstract = True
