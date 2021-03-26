# Generated by Django 2.2.19 on 2021-03-23 14:12

import core.models
from decimal import Decimal
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('modified_on', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=60)),
                ('image', models.FileField(blank=True, default=None, null=True, upload_to=core.models.media_directory)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('modified_on', models.DateTimeField(auto_now=True)),
                ('image', models.FileField(blank=True, default=None, null=True, upload_to=core.models.media_directory)),
                ('title', models.CharField(max_length=150)),
                ('description', models.TextField(blank=True, default='')),
                ('shortDescription', models.TextField(blank=True, default='')),
                ('price', models.DecimalField(decimal_places=2, default=Decimal('0.0'), max_digits=5)),
                ('minQty', models.IntegerField(default=0)),
                ('isActive', models.BooleanField(default=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='services', to='service.Category')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]