from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .viewsets import OrderViewSet, ListTimeslotsView, ValidateSlotView

router = DefaultRouter()
router.register('order', OrderViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("time-slots", ListTimeslotsView.as_view()),
    path("validatetimeslot", ValidateSlotView.as_view())
]
