# Generated by Django 2.2.20 on 2021-04-13 06:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('domain', '0001_initial'),
        ('user_profile', '0004_create_customer'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='domain',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='profiles', to='domain.Domain'),
        ),
    ]