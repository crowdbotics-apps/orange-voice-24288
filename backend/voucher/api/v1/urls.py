from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .viewset import VoucherViewSet

router = DefaultRouter()
router.register('voucher', VoucherViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
