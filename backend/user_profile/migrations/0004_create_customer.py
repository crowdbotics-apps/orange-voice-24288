from django.db import migrations

from user_profile.seeddata import create_customers


def create_seed_customers(_, __):
    create_customers()


class Migration(migrations.Migration):
    dependencies = [
        ('user_profile', '0003_auto_20210402_0626')
    ]

    operations = [
        migrations.RunPython(create_seed_customers, reverse_code=migrations.RunPython.noop)
    ]
