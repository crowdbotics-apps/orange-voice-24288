import os
from django.db import models

from core.models import TimestampModel


def media_directory(instance, filename):
    return os.path.join('media/media_%s' % instance.id, filename)


class Driver(TimestampModel):
    name = models.CharField(max_length=150)
    email = models.CharField(max_length=150, blank=True)
    contactNumber = models.CharField(max_length=20, default='')
    nationality = models.CharField(max_length=200, default='')
    license = models.CharField(max_length=200)
    lat = models.CharField(max_length=150, default='', blank=True)
    lng = models.CharField(max_length=150, default='', blank=True)
    mainAddress = models.TextField(default='', )
    avatar = models.FileField(default=None, upload_to=media_directory, null=True, blank=True)

    @classmethod
    def search(cls, search_query=None, **kwargs):
        queryset = cls.objects.all()
        if search_query:
            queryset = queryset.filter(
                models.Q(contactNumber__icontains=search_query)
            )
        return queryset
