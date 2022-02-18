from django.contrib import admin
from django.contrib import admin
from .models import Order
from .views import order_csv_export_view


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'status', 'profile', 'orderAmount', 'totalAmount', 'discountAmount', 'taxPercentage',
                    'pickupTime', 'pickupDate', 'dropoffTime', 'dropoffDate', 'address', 'driver', 'description']
    list_filter = ['status']

    actions = ['download_csv']

    def download_csv(modeladmin, request, queryset):
        return order_csv_export_view(request, queryset)

    download_csv.short_description = 'Download CSV'
