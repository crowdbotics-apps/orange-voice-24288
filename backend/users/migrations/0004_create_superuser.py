from django.db import migrations
from users.models import User


def create_superuser(_, __):
    users_qs = User.objects.filter(
        email='laundrezuser@gmail.com'
    )
    if users_qs.exists():
        user = users_qs.first()
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True
        user.save()


class Migration(migrations.Migration):
    dependencies = (
        ("users", "0003_add_user_groups"),
    )

    operations = [
        migrations.RunPython(create_superuser, reverse_code=migrations.RunPython.noop)
    ]
