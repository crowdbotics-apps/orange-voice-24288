from rest_framework import viewsets, permissions, authentication
from faq.models import Faq

from .serializers import FaqSerializer


class FaqViewSet(viewsets.ModelViewSet):
    serializer_class = FaqSerializer
    permission_classes = [permissions.IsAuthenticated, ]
    authentication_classes = [authentication.TokenAuthentication, ]

    queryset = Faq.objects.all()

    def get_queryset(self):
        return Faq.objects.search(self.kwargs, params=self.request.query_params)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['domain'] = self.kwargs.get('domain')
        return context
