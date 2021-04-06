from faker import Faker
from django.contrib.auth.models import Group

from users.models import User
from users.enums import UserGroups
from .models import Profile
from address.models import Address

password = '12345678'


def create_customers():
    fake = Faker()
    Faker.seed(0)
    users = [
        {
            "first_name": fake.first_name()[:19],
            "last_name": fake.last_name()[:19],
            "email": fake.email()[:19],
            "username": fake.user_name()[:19],

        } for i in range(100)
    ]


    for user in users:
        user = User.objects.create(**user)
        user.set_password(password)
        user.save()

        customer_group = Group.objects.get(name=UserGroups.customer.name)
        user.groups.add(customer_group)

        profile = Profile.objects.create(
            user=user,
            phoneNo=fake.phone_number()[:19],
            postalCode='M5A'
        )

        address = Address.objects.create(
            profile=profile,
            mainAddress=fake.address(),
            state='SA', postalCode='M5A', phone=fake.phone_number()[:19],
            isPrimary=True
        )
