import jsonfield
from decimal import Decimal
from django.contrib.sites.models import Site
from django.db import models
from core.models import TimestampModel
from core.utils import media_directory
from colorfield.fields import ColorField


class Domain(TimestampModel):
    name = models.CharField(max_length=120, null=True, blank=True)
    logo = models.FileField(default="https://orange-voice-24288.s3.amazonaws.com/media/media_None/app_icon_big.png",
                            upload_to=media_directory, null=True, blank=True)
    users = models.ManyToManyField('users.User', related_name='domains', )
    typography = jsonfield.JSONField()
    site = models.OneToOneField(Site, related_name="domains", on_delete=models.CASCADE, null=True)
    tax = models.CharField(max_length=5, default=13)
    dropOffThreshold = models.IntegerField(default=48)
    deliveryFee = models.DecimalField(
        max_digits=5, decimal_places=2, default=Decimal("0.0")
    )
    contactEmail = models.CharField(max_length=50, default='info@laundrez.ca')
    darkOrange = ColorField(default='#ED8F31')
    lightOrange = ColorField(default='#FC9834')
    white = ColorField(default='#FFFFFF')
    steelBlue = ColorField(default='#2C436A')
    lightBlue = ColorField(default='#357BF3')
    fbBlue = ColorField(default='#255d9a')
    boxShadow = ColorField(default='#2c436a')
    fieldLabel = ColorField(default='#949EAE')

    def __str__(self):
        name = ''
        if self.users.all().exists():
            name = self.users.first().email
        return f'{self.pk} - {name}'
