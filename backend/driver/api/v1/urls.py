from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .viewsets import DriverViewSet

router = DefaultRouter()
router.register('driver', DriverViewSet)

urlpatterns = [
    path("", include(router.urls))
]