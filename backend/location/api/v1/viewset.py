from rest_framework import viewsets, authentication
from rest_framework.permissions import IsAuthenticated
from location.models import Location
from .serializers import LocationSerializers


class LocationViewSet(viewsets.ModelViewSet):
    serializer_class = LocationSerializers
    authentication_classes = (
        authentication.TokenAuthentication,
        authentication.SessionAuthentication
    )
    permission_classes = [IsAuthenticated, ]
    queryset = Location.objects.all()

    def get_queryset(self):
        queryset = Location.objects.search(self.kwargs, params=self.request.query_params)
        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['domain'] = self.kwargs.get('domain')
        return context
