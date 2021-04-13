from rest_framework import authentication
from rest_framework.permissions import IsAuthenticated

from .serializers import (
    AddressSerializer
)
from address.models import Address
from rest_framework import viewsets


class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    authentication_classes = (
        authentication.TokenAuthentication,
        authentication.SessionAuthentication
    )
    permission_classes = [IsAuthenticated, ]
    queryset = Address.objects.all()

    def get_queryset(self):
        queryset = Address.objects.search(self.kwargs, params=self.request.query_params)
        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['domain'] = self.kwargs.get('domain')
        return context
