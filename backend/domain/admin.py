from django.contrib import admin
from django.contrib import admin
from .models import Domain


@admin.register(Domain)
class DomainAdmin(admin.ModelAdmin):
    list_display = ['id', 'name',  'site', 'tax', 'dropOffThreshold', 'deliveryFee', 'contactEmail',
                    'darkOrange', 'lightOrange', 'white', 'steelBlue', 'lightBlue', 'lightBlue', 'fbBlue', 'boxShadow',
                    'fieldLabel']
