# Generated by Django 2.2.24 on 2021-09-10 13:56

from decimal import Decimal
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('domain', '0003_auto_20210831_1645'),
    ]

    operations = [
        migrations.AddField(
            model_name='domain',
            name='deliveryFee',
            field=models.DecimalField(decimal_places=2, default=Decimal('0.0'), max_digits=5),
        ),
    ]
