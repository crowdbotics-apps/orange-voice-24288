from enum import Enum


class UserGroups(Enum):
    admin = 'Admin'
    customer = 'Customer'


user_groups = [group.name for group in UserGroups]