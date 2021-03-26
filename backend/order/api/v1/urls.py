from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .viewsets import OrderViewSet, ListTimeslotsView, ValidateSlotView, OrderStatusAPIView

router = DefaultRouter()
router.register('order', OrderViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("time-slots", ListTimeslotsView.as_view()),
    path("validatetimeslot", ValidateSlotView.as_view()),
    path("order/status/<int:pk>/", OrderStatusAPIView.as_view())
]
