# Generated by Django 2.2.19 on 2021-03-24 19:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('address', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='address',
            old_name='buzzCode',
            new_name='buzzerCode',
        ),
    ]
