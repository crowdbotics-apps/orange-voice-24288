from django.db import models
from core.models import TimestampModel
from .utils import validate_search_profile_params


class ProfileQueryset(models.QuerySet):
    def search(self, search_query=None, **kwargs):
        params = validate_search_profile_params(kwargs.get('params', {}))
        queryset = self.all()
        if search_query:
            queryset = queryset.filter(
                models.Q(user__last_name__icontains=search_query) |
                models.Q(user__first_name__icontains=search_query)
            )
        return queryset.filter(**params)


class Profile(TimestampModel):
    user = models.OneToOneField(
        "users.User",
        on_delete=models.CASCADE,
        related_name="profile",
    )
    phoneNo = models.CharField(
        max_length=20, null=True, blank=True,
    )
    postalCode = models.CharField(max_length=10, null=True, blank=True)
    referralCode = models.CharField(max_length=160, null=True, blank=True)
    stripeCustomerId = models.CharField(max_length=160, null=True, blank=True)
    businessName = models.CharField(max_length=160, null=True, blank=True)
    businessAddress = models.CharField(max_length=260, null=True, blank=True)
    stripeCustomerId = models.CharField(max_length=160, null=True, blank=True)
    oneSignalPlayerId = models.CharField(max_length=160, null=True, blank=True)
    objects = ProfileQueryset.as_manager()

    def firstName(self):
        return self.user.first_name

    def lastName(self):
        return self.user.last_name

    def email(self):
        return self.user.email

    def fullname(self):
        """ Display either first name and last name or username """
        if any([self.user.first_name, self.user.last_name]):
            return f'{self.user.first_name} {self.user.last_name}'
        return f''

    def __str__(self):
        return f'{self.user}'
