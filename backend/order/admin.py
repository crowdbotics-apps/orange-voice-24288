from django.contrib import admin
from django.contrib import admin
from .models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'status', 'profile', 'orderAmount', 'totalAmount', 'discountAmount', 'taxPercentage',
                    'pickupTime', 'pickupDate', 'dropoffTime', 'dropoffDate', 'address', 'driver', 'description']
    list_filter = ['status']
