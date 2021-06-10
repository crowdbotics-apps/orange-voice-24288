from rest_framework import authentication, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from device.models import Device
from .serializers import (
    DeviceSerializer
)

from rest_framework import viewsets


class DeviceViewSet(viewsets.ModelViewSet):
    serializer_class = DeviceSerializer
    authentication_classes = (
        authentication.TokenAuthentication,
        authentication.SessionAuthentication
    )
    permission_classes = [IsAuthenticated, ]
    queryset = Device.objects.all()

    def get_queryset(self, **args):
        queryset = Device.objects.all()
        return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        pass  # never destroy any instance

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['domain'] = self.kwargs.get('domain')
        return context
