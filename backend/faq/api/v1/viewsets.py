from rest_framework import viewsets, permissions, authentication
from faq.models import Faq

from .serializers import FaqSerializer


class FaqViewSet(viewsets.ModelViewSet):
    serializer_class = FaqSerializer
    permission_classes = [permissions.IsAuthenticated, ]
    authentication_classes = [authentication.TokenAuthentication, ]

    queryset = Faq.objects.all()

    def get_queryset(self):
        search_query = self.request.query_params.get('search')
        return Faq.objects.search(search_query, params=self.request.query_params)
