from rest_framework import authentication, status

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from domain.models import Domain
from .serializers import (
    DomainSeriazer
)

from rest_framework import viewsets


class DomainViewSet(viewsets.ModelViewSet):
    serializer_class = DomainSeriazer
    authentication_classes = (
        authentication.TokenAuthentication,
        authentication.SessionAuthentication
    )
    permission_classes = [IsAuthenticated, ]
    queryset = Domain.objects.all()

    def get_queryset(self):
        queryset = Domain.objects.filter(users__in=[self.request.user.id])
        return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        pass  # never destroy any instance
