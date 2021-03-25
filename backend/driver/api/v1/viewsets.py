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

    def get_queryset(self):
        search_query = self.request.query_params.get('search', None)
        queryset = Driver.search(search_query, params=self.request.query_params)
        return queryset
