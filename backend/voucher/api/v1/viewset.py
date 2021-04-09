from rest_framework import viewsets, authentication, permissions
from voucher.models import Voucher
from .serializers import VoucherSerializer


class VoucherViewSet(viewsets.ModelViewSet):
    serializer_class = VoucherSerializer
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    queryset = Voucher.objects.all()

    def get_queryset(self):
        search_query = self.request.query_params.get('search', None)
        queryset = Voucher.objects.search(search_query, params=self.request.query_params)
        return queryset
