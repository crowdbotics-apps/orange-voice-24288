# Generated by Django 2.2.20 on 2021-04-12 15:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('voucher', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='voucher',
            name='code',
            field=models.CharField(blank=True, max_length=120, null=True),
        ),
    ]