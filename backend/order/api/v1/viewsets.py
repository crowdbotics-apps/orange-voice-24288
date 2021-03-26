from rest_framework import authentication, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import (
    OrderSerializer
)
from order.models import Order
from order.utils import time_slots
from core.utils import update_object


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    authentication_classes = (
        authentication.TokenAuthentication,
        authentication.SessionAuthentication
    )
    permission_classes = [IsAuthenticated, ]
    queryset = Order.objects.all()

    def get_queryset(self):
        search_query = self.request.query_params.get('search', None)
        queryset = Order.search(search_query, params=self.request.query_params)
        return queryset


class ListTimeslotsView(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    def get(self, request, format=None):
        return Response({'result': time_slots})


class ValidateSlotView(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
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

    def put(self, request, pk, format=None):
        order = Order.objects.get(pk=pk)
        data = {
            "status": request.data.get('status')
        }
        if request.data.get('driver'):
            data['driver_id'] = request.data.get('driver')
        update_object(order, data)
        return Response(status=status.HTTP_204_NO_CONTENT)