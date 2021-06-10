from django.db import migrations
from django.contrib.auth.models import Group
from users.enums import user_groups


def create_default_groups(_, __):
    for group in user_groups:
        Group.objects.get_or_create(name=group)


class Migration(migrations.Migration):
    dependencies = (
        ("users", "0004_create_superuser"),
    )
    operations = [
        migrations.RunPython(create_default_groups, reverse_code=migrations.RunPython.noop)
    ]
