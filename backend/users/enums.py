from enum import Enum


class UserGroups(Enum):
    admin = 'Admin'
    customer = 'Customer'
    driver = 'Driver'


user_groups = [group.name for group in UserGroups]