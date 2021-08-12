import stripe
from django.conf import settings
from rest_framework import authentication, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from payment.models import Card, OrderPayment
from .serializers import (
    CardSerializer
)
from user_profile.models import Profile

from rest_framework import viewsets

stripe.api_key = settings.STRIPE_API_KEY


class StripeConnectAPIView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated, ]

    def get(self, request, domain=None, format=None):
        if hasattr(request.user, 'profile'):
            profile = request.user.profile
        else:
            profile = Profile.objects.create(user=request.user)
        if not profile.stripeCustomerId:
            account = stripe.Account.create(
                type='standard',
            )
            profile.stripeCustomerId = account.id
            print('Stripe account created :: ', account.id)
        else:
            print('Stripe account exists :: ', profile.stripeCustomerId)
            account = stripe.Account.retrieve(profile.stripeCustomerId)
        account_links = stripe.AccountLink.create(
            account=account.id,
            refresh_url='http://192.168.0.100:8000/',
            return_url='http://192.168.0.100:8000/',
            type='account_onboarding',
        )
        print('Stripe account links ::: ', account_links)
        return Response({'result': {"account_link": account_links}})


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
