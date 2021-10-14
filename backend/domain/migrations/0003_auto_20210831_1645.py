# Generated by Django 2.2.24 on 2021-08-31 16:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('domain', '0002_domain_site'),
    ]

    operations = [
        migrations.AddField(
            model_name='domain',
            name='contactEmail',
            field=models.CharField(default='info@laundrez.ca', max_length=50),
        ),
        migrations.AddField(
            model_name='domain',
            name='dropOffThreshold',
            field=models.IntegerField(default=48),
        ),
        migrations.AddField(
            model_name='domain',
            name='tax',
            field=models.CharField(default=13, max_length=5),
        ),
    ]