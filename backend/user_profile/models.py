from django.db import models
from core.models import TimestampModel


class Profile(TimestampModel):
    user = models.OneToOneField(
        "users.User",
        on_delete=models.CASCADE,
        related_name="profile",
    )
    phone_number = models.CharField(
        max_length=20, null=True, blank=True,
    )
    postal_code = models.CharField(  max_length=10, null=True, blank=True)
    referral_code = models.CharField(  max_length=60, null=True, blank=True)



    @classmethod
    def search(cls, search_query=None, **kwargs):
        queryset = cls.objects.all()
        if search_query:
            queryset = queryset.filter(
                models.Q(team__icontains=search_query) |
                models.Q(user__last_name__icontains=search_query) |
                models.Q(user__first_name__icontains=search_query)
            )
        return queryset.filter()

    def fullname(self):
        """ Display either first name and last name or username """
        if any([self.user.first_name, self.user.last_name]):
            return f'{self.user.first_name} {self.user.last_name}'
        return f'{self.user.username}'

    def __str__(self):
        return f'{self.user}'
