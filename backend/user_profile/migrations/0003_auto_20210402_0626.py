# Generated by Django 2.2.19 on 2021-04-02 06:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0002_auto_20210324_1543'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='businessAddress',
            field=models.CharField(blank=True, max_length=260, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='businessName',
            field=models.CharField(blank=True, max_length=160, null=True),
        ),
    ]
