import stripe
from django.conf import settings
from django.db import transaction
from rest_framework import authentication, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from payment.models import Card, OrderPayment
from user_profile.api.v1.serializers import ProfileSerializer
from .serializers import (
    CardSerializer
)
from user_profile.models import Profile

from rest_framework import viewsets

stripe.api_key = settings.STRIPE_API_KEY


class StripeConnectAPIView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated, ]

    def post(self, request, domain=None, format=None):
        if hasattr(request.user, 'profile'):
            profile = request.user.profile
        else:
            profile = Profile.objects.create(user=request.user)
        try:
            authorization_code = request.data.get('code')
            response = stripe.OAuth.token(
                code=authorization_code,
                grant_type='authorization_code'
            )
            with transaction.atomic():
                profile.stripeCustomerId = response.get(
                    'stripe_user_id'
                )
                profile.save()
            serializer = ProfileSerializer(profile)
            return Response(serializer.data)
        except Exception as e:
            return Response({'error': "Error connecting to stripe."})


class MakePaymentView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated, ]

    def post(self, request, domain=None, format=None):
        card = Card.objects.get(id=request.data.get('cardId'))

        token = stripe.Token.create(
            card={
                "number": card.cardNumber,
                "exp_month": card.expiryMonth,
                "exp_year": card.expiryYear,
                "cvc": card.cvvNumber,
            },
        )

        stripe_charge = stripe.Charge.create(
            amount=int(request.data.get('totalAmount', 0) * 100),
            currency="usd",
            source=token.id,
            description="My First Test Charge (created for API docs)",
        )

        OrderPayment.objects.create(
            user=request.user,
            card_id=request.data.get('cardId'),
            amount=request.data.get('totalAmount'),
            order_id=request.data.get('orderId'),
            stripe_charge=stripe_charge.id,
            domain_id=domain
        )
        return Response({'result': request.data})


class CardViewSet(viewsets.ModelViewSet):
    serializer_class = CardSerializer
    authentication_classes = (
        authentication.TokenAuthentication,
        authentication.SessionAuthentication
    )
    permission_classes = [IsAuthenticated, ]
    queryset = Card.objects.all()

    def get_queryset(self, **args):
        queryset = Card.objects.filter(user=self.request.user)
        return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user == instance.user:
            self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['domain'] = self.kwargs.get('domain')
        return context
