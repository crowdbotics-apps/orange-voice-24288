from rest_framework import authentication
from rest_framework.permissions import IsAuthenticated

from .serializers import (
    ServiceSerializer,
    CategorySerializer
)
from service.models import Service, Category
from rest_framework import viewsets


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    authentication_classes = (
        authentication.TokenAuthentication,
        authentication.SessionAuthentication
    )
    permission_classes = [IsAuthenticated, ]

    queryset = Category.objects.all()

    def get_queryset(self):
        queryset = Category.objects.search(self.kwargs, params=self.request.query_params)
        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['domain'] = self.kwargs.get('domain')
        return context


class ServiceViewSet(viewsets.ModelViewSet):
    serializer_class = ServiceSerializer
    authentication_classes = (
        authentication.TokenAuthentication,
        authentication.SessionAuthentication
    )
    permission_classes = [IsAuthenticated, ]
    queryset = Service.objects.all()

    def get_queryset(self):
        queryset = Service.objects.search(self.kwargs, params=self.request.query_params)
        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['domain'] = self.kwargs.get('domain')
        return context
