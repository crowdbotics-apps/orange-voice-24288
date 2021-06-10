# Generated by Django 2.2.23 on 2021-06-10 08:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('driver', '0005_auto_20210415_2022'),
    ]

    operations = [
        migrations.AddField(
            model_name='driver',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='drivers', to=settings.AUTH_USER_MODEL),
        ),
    ]
