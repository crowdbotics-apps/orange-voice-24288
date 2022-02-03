from django.contrib import admin
from django.contrib import admin
from .models import Profile

list_display = ["id", "user", "phoneNo", "postalCode", "referralCode", "stripeCustomerId", "oneSignalPlayerId", "domain"]


class Customer(Profile):
    class Meta:
        proxy = True


class Driver(Profile):
    list_display = list_display

    class Meta:
        proxy = True


class Business(Profile):
    class Meta:
        proxy = True


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = list_display

    def get_queryset(self, request):
        # qs = super(Profile, self).get_queryset(request)
        qs = Profile.objects.all()
        qs = qs.filter(user__groups__name='customer')
        return qs


@admin.register(Driver)
class DriverAdmin(admin.ModelAdmin):
    list_display = list_display

    def get_queryset(self, request):
        qs = Profile.objects.filter(user__groups__name='driver')
        return qs


#
#
@admin.register(Business)
class BusinessAdmin(admin.ModelAdmin):
    list_display = ['businessName', 'businessAddress'] + list_display

    def get_queryset(self, request):
        qs = Profile.objects.filter(user__groups__name='admin')
        return qs
