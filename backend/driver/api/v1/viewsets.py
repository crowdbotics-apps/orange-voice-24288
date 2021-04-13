from rest_framework import authentication
from rest_framework.permissions import IsAuthenticated

from driver.models import Driver
from .serializers import (
    DriverSerializer
)

from rest_framework import viewsets


class DriverViewSet(viewsets.ModelViewSet):
    serializer_class = DriverSerializer
    authentication_classes = (
        authentication.TokenAuthentication,
        authentication.SessionAuthentication
    )
    permission_classes = [IsAuthenticated, ]
    queryset = Driver.objects.all()

    def get_queryset(self, **args):
        queryset = Driver.objects.search(self.kwargs,  params=self.request.query_params)
        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['domain'] = self.kwargs.get('domain')
        return context
