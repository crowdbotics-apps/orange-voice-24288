from django.db import models

from core.models import TimestampModel


class LocationQueryset(models.QuerySet):
    def search(self, lookup, params):
        queryset = self.filter(**lookup)
        search_query = params.get('search')

        if search_query:
            queryset = queryset.filter(
                models.Q(name__icontains=search_query) |
                models.Q(postalCode__icontains=search_query)
            )
        return queryset


class Location(TimestampModel):
    name = models.CharField(max_length=150)
    postalCode = models.CharField(max_length=160)
    domain = models.ForeignKey('domain.Domain', related_name='locations', on_delete=models.CASCADE, blank=True, null=True)

    objects = LocationQueryset.as_manager()
