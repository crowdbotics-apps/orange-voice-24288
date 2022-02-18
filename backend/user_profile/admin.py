from django.contrib import admin
from django.contrib import admin
from .models import Profile
from .views import business_csv_export_view

list_display = ["id", "user", "phoneNo", "postalCode", "referralCode", "stripeCustomerId", "oneSignalPlayerId",
                "domain"]


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
    list_display = list_display + ['last_sale_update']
    actions = ['download_csv']
    readonly_fields = ('last_sale_update',)

    def last_sale_update(self, obj):
        order = obj.orders.first()
        if order:
            return order.created_on
        return ''

    def download_csv(modeladmin, request, queryset):
        return business_csv_export_view(request, queryset)

    download_csv.short_description = 'Download CSV'

    def get_queryset(self, request):
        # qs = super(Profile, self).get_queryset(request)
        qs = Profile.objects.all()
        qs = qs.filter(user__groups__name='customer')
        return qs


@admin.register(Driver)
class DriverAdmin(admin.ModelAdmin):
    list_display = list_display

    actions = ['download_csv']

    def download_csv(modeladmin, request, queryset):
        return business_csv_export_view(request, queryset)

    download_csv.short_description = 'Download CSV'

    def get_queryset(self, request):
        qs = Profile.objects.filter(user__groups__name='driver')
        return qs


#
#
@admin.register(Business)
class BusinessAdmin(admin.ModelAdmin):
    list_display = ['businessName', 'businessAddress'] + list_display
    actions = ['download_csv']

    def download_csv(modeladmin, request, queryset):
        return business_csv_export_view(request, queryset)

    download_csv.short_description = 'Download CSV'

    def get_queryset(self, request):
        qs = Profile.objects.filter(user__groups__name='admin')
        return qs
