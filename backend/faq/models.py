from django.db import models

from core.models import TimestampModel


class FaqQueryset(models.QuerySet):
    def search(self, lookup, **kwargs):
        queryset = self.filter(**lookup)
        search_query = kwargs.get('params', {}).get('search')
        if search_query:
            queryset = queryset.filter(
                models.Q(question__icontains=search_query) |
                models.Q(answer__icontains=search_query)
            )
        return queryset


class Faq(TimestampModel):
    question = models.CharField(max_length=200)
    answer = models.TextField()
    service = models.ForeignKey('service.Service', related_name='faqs', on_delete=models.CASCADE, null=True, blank=True)
    objects = FaqQueryset.as_manager()
    domain = models.ForeignKey('domain.Domain', related_name='faqs', on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        ordering = ('-pk',)
