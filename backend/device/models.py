from django.db import models

from core.models import TimestampModel


class Device(TimestampModel):
    player_id = models.CharField(max_length=150)
    user = models.ForeignKey('users.User', related_name='devices', on_delete=models.CASCADE)
