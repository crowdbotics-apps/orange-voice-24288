# Generated by Django 2.2.19 on 2021-03-24 19:21

from decimal import Decimal
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('address', '0001_initial'),
        ('service', '0001_initial'),
        ('user_profile', '0002_auto_20210324_1543'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('modified_on', models.DateTimeField(auto_now=True)),
                ('description', models.TextField(blank=True)),
                ('deliveryAddress', models.TextField(blank=True)),
                ('orderAmount', models.DecimalField(decimal_places=2, default=Decimal('0.0'), max_digits=5)),
                ('totalAmount', models.DecimalField(decimal_places=2, default=Decimal('0.0'), max_digits=5)),
                ('discountAmount', models.DecimalField(decimal_places=2, default=Decimal('0.0'), max_digits=5)),
                ('taxPercentage', models.DecimalField(decimal_places=2, default=Decimal('0.0'), max_digits=5)),
                ('feedbackRating', models.IntegerField(blank=True, default=0)),
                ('pickupTime', models.CharField(max_length=150)),
                ('dropoffTime', models.CharField(max_length=150)),
                ('dropoffDate', models.DateTimeField(blank=True, null=True)),
                ('pickupDate', models.DateTimeField(blank=True, null=True)),
                ('address', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orders', to='address.Address')),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orders', to='user_profile.Profile')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='OrderDetail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField()),
                ('unitPrice', models.DecimalField(decimal_places=2, default=Decimal('0.0'), max_digits=5)),
                ('amount', models.DecimalField(decimal_places=2, default=Decimal('0.0'), max_digits=5)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_details', to='order.Order')),
                ('service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_details', to='service.Service')),
            ],
        ),
    ]
