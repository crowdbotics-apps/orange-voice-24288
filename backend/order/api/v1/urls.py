from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .viewsets import (
    OrderViewSet, ListTimeslotsView, ValidateSlotView, OrderStatusAPIView, ListLovView, TimeSlotViewSet,
    BulkTimeSlotAPIView)

router = DefaultRouter()
router.register('order', OrderViewSet)
router.register('timeslots', TimeSlotViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("time-slots", ListTimeslotsView.as_view()),
    path("bulk-timeslots/", BulkTimeSlotAPIView.as_view()),

    path("validatetimeslot", ValidateSlotView.as_view()),
    path("lov/all", ListLovView.as_view()),
    path("order/status/<int:pk>/", OrderStatusAPIView.as_view()),
    path("driver/<int:driver_id>/order", OrderViewSet.as_view({'get': 'list'})),
    path("customer/<int:profile_id>/order", OrderViewSet.as_view({'get': 'list'})),

]
