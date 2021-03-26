# Generated by Django 2.2.19 on 2021-03-26 05:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('driver', '0002_driver_email'),
        ('order', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='driver',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='orders', to='driver.Driver'),
        ),
        migrations.AddField(
            model_name='order',
            name='status',
            field=models.CharField(blank=True, choices=[('OrderPlaced', 'OrderPlaced'), ('PickUp', 'PickUp'), ('InProgress', 'InProgress'), ('DropOff', 'DropOff'), ('Delivered', 'Delivered'), ('Cancelled', 'Canceled')], default='OrderPlaced', max_length=25, null=True, verbose_name='Order status'),
        ),
        migrations.AlterField(
            model_name='order',
            name='address',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='orders', to='address.Address'),
        ),
    ]