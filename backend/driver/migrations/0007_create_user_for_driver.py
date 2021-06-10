from django.db import migrations
from allauth.utils import email_address_exists, generate_unique_username
from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model
from allauth.account.adapter import get_adapter

from driver.models import Driver
from users.enums import UserGroups
from users.models import User
from user_profile.models import Profile


def create_user_drivers(_, __):
    for driver in Driver.objects.all():
        name = driver.name
        email = driver.email
        password = driver.license
        user_qs = User.objects.filter(email=email)
        if user_qs.exists():
            user = user_qs.first()
        else:
            user = User(
                email=email,
                username=generate_unique_username(
                    [name, email, "user"]
                )
            )
            user.set_password(password)
            user.save()

            Profile.objects.create(
                domain=driver.domain,
                user=user,
                phoneNo=driver.contactNumber,
            )

        driver_group = Group.objects.get(name=UserGroups.driver.name)
        user.groups.add(driver_group)
        driver.user = user
        driver.save()




class Migration(migrations.Migration):
    dependencies = [
        ('driver', '0006_driver_user'),
    ]

    operations = [
        migrations.RunPython(create_user_drivers, reverse_code=migrations.RunPython.noop)
    ]
