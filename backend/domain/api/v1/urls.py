from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .viewsets import DomainViewSet, GetDomainViewSet

router = DefaultRouter()
router.register('domain', DomainViewSet)
router.register('get_domain', GetDomainViewSet)

urlpatterns = [
    path("", include(router.urls))
]
