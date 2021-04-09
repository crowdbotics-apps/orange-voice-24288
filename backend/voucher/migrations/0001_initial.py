# Generated by Django 2.2.20 on 2021-04-09 03:49

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Voucher',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('modified_on', models.DateTimeField(auto_now=True)),
                ('code', models.CharField(max_length=120)),
                ('validFrom', models.DateTimeField(auto_now_add=True)),
                ('validTo', models.DateTimeField(auto_now_add=True)),
                ('couponType', models.CharField(blank=True, choices=[('Promo', 'Promo'), ('Referral', 'Referral')], default='Promo', max_length=25, null=True)),
                ('offerType', models.CharField(blank=True, choices=[('Amount', 'Amount'), ('Percentage', 'Percentage')], default='Amount', max_length=25, null=True)),
                ('offerValue', models.IntegerField()),
                ('maxRedeem', models.IntegerField()),
                ('numberRedeem', models.IntegerField()),
                ('minProduct', models.IntegerField()),
                ('minAmount', models.IntegerField()),
                ('isActive', models.BooleanField(default=True)),
            ],
            options={
                'ordering': ('-pk',),
            },
        ),
    ]
