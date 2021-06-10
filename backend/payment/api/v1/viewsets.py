from rest_framework import authentication, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from payment.models import Card
from .serializers import (
    CardSerializer
)

from rest_framework import viewsets


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
