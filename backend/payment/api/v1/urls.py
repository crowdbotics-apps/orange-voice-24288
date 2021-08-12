from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .viewsets import CardViewSet, MakePaymentView, StripeConnectAPIView

router = DefaultRouter()
router.register('cards', CardViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("order-payment", MakePaymentView.as_view()),
    path("stripe-connect", StripeConnectAPIView.as_view())
]
