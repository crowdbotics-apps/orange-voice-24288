from django.db import migrations

from users.models import User
from domain.models import Domain


def add_to_domain(_, __):
    for user in User.objects.all():
        if not user.profile.domain:
            domain = Domain.objects.create()
            domain.users.add(user)
            user.profile.domain = domain
            profile = user.profile
            profile.domain = domain
            profile.save()
            user.save()


class Migration(migrations.Migration):
    dependencies = [
        ('user_profile', '0005_profile_domain')
    ]

    operations = [
        migrations.RunPython(add_to_domain, reverse_code=migrations.RunPython.noop)
    ]
