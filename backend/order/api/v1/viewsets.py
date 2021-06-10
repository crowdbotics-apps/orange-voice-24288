from rest_framework import authentication, viewsets, status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import (
    OrderSerializer
)
from order.models import Order
from order.utils import time_slots, lovs
from core.utils import update_object


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    authentication_classes = (
        authentication.TokenAuthentication,
        authentication.SessionAuthentication
    )
    permission_classes = [IsAuthenticated, ]
    queryset = Order.objects.all()

    def list(self, request, *args, **kwargs):

        queryset = self.filter_queryset(self.get_queryset())

        driver_pk = kwargs.get('driver_id', 0)
        if driver_pk:
            queryset = queryset.filter(driver=driver_pk)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def get_queryset(self):
        queryset = Order.objects.search(self.kwargs, params=self.request.query_params)
        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['domain'] = self.kwargs.get('domain')
        return context


class ListTimeslotsView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated, ]

    def get(self, request, domain=None, format=None):
        return Response({'result': time_slots})

    def post(self, request, domain=None, format=None):
        return Response({'result': time_slots})


class ListLovView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated, ]

    def get(self, request, domain=None, format=None):
        return Response({'results': lovs, "paging": None,
                         "filter": None,
                         "orderBy": None,
                         "includes": None,
                         "hasErrors": False,
                         "error": None})


class ValidateSlotView(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, domain=None, format=None):
        return Response({
            "result": "valid",
            "paging": None,
            "filter": None,
            "orderBy": None,
            "includes": None,
            "hasErrors": False,
            "error": None
        })


class OrderStatusAPIView(APIView):
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]
    permission_classes = [IsAuthenticated, ]

    def put(self, request, pk, domain, format=None):
        order = Order.objects.get(pk=pk, domain_id=domain)
        data = {
            "status": request.data.get('status')
        }
        if request.data.get('driver'):
            data['driver_id'] = request.data.get('driver')
        update_object(order, data)
        return Response(status=status.HTTP_204_NO_CONTENT)
