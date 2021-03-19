
from django.db import models


class TimestampModel(models.Model):
    created_on = models.DateTimeField(
        auto_now_add=True,
    )

    modified_on = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        abstract = True