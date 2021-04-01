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
        search_query = self.request.query_params.get('search', None)
        queryset = Location.objects.search(search_query, params=self.request.query_params)
        return queryset
