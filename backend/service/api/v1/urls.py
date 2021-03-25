from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .viewsets import ServiceViewSet, CategoryViewSet

router = DefaultRouter()
router.register('service', ServiceViewSet)
router.register('category', CategoryViewSet)

urlpatterns = [
    path("", include(router.urls))
]
