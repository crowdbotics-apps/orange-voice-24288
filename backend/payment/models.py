from django.db import models


class Card(models.Model):
    user = models.ForeignKey('users.User', related_name='cards', on_delete=models.CASCADE)
    domain = models.ForeignKey('domain.Domain', related_name='cards', on_delete=models.CASCADE, blank=True, null=True)
    cardNumber = models.CharField(max_length=50)
    expiryMonth = models.CharField(max_length=30)
    expiryYear = models.IntegerField()
    cvvNumber = models.CharField(max_length=10)
