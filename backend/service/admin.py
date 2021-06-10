from django.contrib import admin
from service.models import Service, Category


# Register your models here.
@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    pass


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass
