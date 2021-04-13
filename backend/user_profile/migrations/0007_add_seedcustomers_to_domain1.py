from django.db import migrations

from user_profile.seeddata import add_customer_to_superuser_domain


def update_customer_details(_, __):
    add_customer_to_superuser_domain()


class Migration(migrations.Migration):
    dependencies = [
        ('user_profile', '0006_add_existing_users_to_domain1')
    ]

    operations = [
        migrations.RunPython(update_customer_details, migrations.RunPython.noop)
    ]
