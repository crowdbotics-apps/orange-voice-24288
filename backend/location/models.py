from django.db import models

from core.models import TimestampModel


class LocationQueryset(models.QuerySet):
    def search(self, search_query, **kwargs):
        queryset = self.filter()

        if search_query:
            queryset = queryset.filter(
                models.Q(name__icontains=search_query) |
                models.Q(postalCode__icontains=search_query)
            )
        return queryset


class Location(TimestampModel):
    name = models.CharField(max_length=150)
    postalCode = models.CharField(max_length=160)

    objects = LocationQueryset.as_manager()
