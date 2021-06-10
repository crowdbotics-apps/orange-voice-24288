import jsonfield
from django.contrib.sites.models import Site
from django.db import models
from core.models import TimestampModel
from core.utils import media_directory


class Domain(TimestampModel):
    name = models.CharField(max_length=120, null=True, blank=True)
    logo = models.FileField(default=None, upload_to=media_directory, null=True, blank=True)
    users = models.ManyToManyField('users.User', related_name='domains',)
    typography = jsonfield.JSONField()
    site = models.OneToOneField(Site, related_name="domains", on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f'{self.pk} - {self.name}'
