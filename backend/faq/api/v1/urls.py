from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .viewsets import FaqViewSet

router = DefaultRouter()
router.register('faq', FaqViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
