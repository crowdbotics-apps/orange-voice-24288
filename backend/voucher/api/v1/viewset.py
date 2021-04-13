from rest_framework import viewsets, authentication, permissions
from voucher.models import Voucher
from .serializers import VoucherSerializer


class VoucherViewSet(viewsets.ModelViewSet):
    serializer_class = VoucherSerializer
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    queryset = Voucher.objects.all()

    def get_queryset(self):
        queryset = Voucher.objects.search(self.kwargs, params=self.request.query_params)
        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['domain'] = self.kwargs.get('domain')
        return context
