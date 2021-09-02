from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .viewsets import DomainViewSet

router = DefaultRouter()
router.register('domain', DomainViewSet)

urlpatterns = [
    path("", include(router.urls))
]
