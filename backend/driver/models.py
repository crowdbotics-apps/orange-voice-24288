import os
from django.db import models

from core.models import TimestampModel


def media_directory(instance, filename):
    return os.path.join('media/media_%s' % instance.id, filename)


class DriverQuerySet(models.QuerySet):
    def search(self, lookup, params):
        search_query = params.get('search')
        queryset = self.filter(**lookup)

        if search_query:
            queryset = queryset.filter(
                models.Q(contactNumber__icontains=search_query)
            )
        return queryset


class Driver(TimestampModel):
    name = models.CharField(max_length=150)
    email = models.CharField(max_length=150, blank=True)
    contactNumber = models.CharField(max_length=20, default='')
    nationality = models.CharField(max_length=200, default='')
    license = models.CharField(max_length=200)
    lat = models.CharField(max_length=150, default='', blank=True)
    lng = models.CharField(max_length=150, default='', blank=True)
    mainAddress = models.TextField(default='', )
    image = models.FileField(default=None, upload_to=media_directory, null=True, blank=True)
    domain = models.ForeignKey('domain.Domain', related_name='drivers', on_delete=models.CASCADE, blank=True, null=True)
    objects = DriverQuerySet.as_manager()
