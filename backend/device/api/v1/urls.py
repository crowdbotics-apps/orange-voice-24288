from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .viewsets import DeviceViewSet

router = DefaultRouter()
router.register('device', DeviceViewSet)

urlpatterns = [
    path("", include(router.urls))
]
