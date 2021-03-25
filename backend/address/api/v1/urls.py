from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .viewsets import AddressViewSet

router = DefaultRouter()
router.register('address', AddressViewSet)

urlpatterns = [
    path("", include(router.urls))
]
