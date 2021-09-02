from django.db import transaction
from rest_framework import authentication, viewsets, status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import (
    OrderSerializer, TimeSlotSerializer
)

from domain.models import Domain
from order.models import Order, TimeSlot
from order.utils import time_slots, lovs
from core.utils import update_object


class TimeSlotViewSet(viewsets.ModelViewSet):
    serializer_class = TimeSlotSerializer
    authentication_classes = (
        authentication.TokenAuthentication,
        authentication.SessionAuthentication
    )
    permission_classes = [IsAuthenticated, ]
    queryset = TimeSlot.objects.all()

    def get_queryset(self):
        queryset = TimeSlot.objects.search(self.kwargs, params=self.request.query_params)
        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['domain'] = self.kwargs.get('domain')
        return context


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
        request_path = request._request.path
        if driver_pk and 'driver' in request_path:
            queryset = queryset.filter(driver=driver_pk)
        elif kwargs.get('profile_id'):
            profile_id = kwargs.get('profile_id', -1)
            queryset = queryset.filter(profile_id=profile_id)

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


class BulkTimeSlotAPIView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated, ]

    @transaction.atomic()
    def post(self, request, domain=None, format=None):
        if not Domain.objects.filter(id=domain, users__in=[request.user.id]).exists():
            raise serializers.ValidationError(
                "You do not have permissions to edit this Timeslot."
            )

        TimeSlot.objects.filter(domain_id=domain).delete()
        for slot in request.data.get('timeslots'):
            TimeSlot.objects.update_or_create(
                domain_id=domain,
                start=slot.get('start'),
                end=slot.get('end')
            )

        return Response({'result': [{'id': i.id, 'start': i.start, 'end': i.end} for i in
                                    TimeSlot.objects.filter(domain_id=domain)]})


class ListLovView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated, ]

    def get(self, request, domain=None, format=None):
        time_slots_qs = TimeSlot.objects.filter(domain_id=domain)
        time_slots = []
        for slot in time_slots_qs:
            time_slots.append({
                "groupName": "TimeSlot",
                "key": "Slot11",
                "value": f"{slot.start.strftime('%I:%M %p', )} - {slot.end.strftime('%I:%M %p', )}",
            })

        domain_qs = Domain.objects.filter(id=domain)
        if domain_qs.exists():
            domain_brand = domain_qs.first()
            time_slots.append({
                "groupName": "System",
                "key": "ContactEmail",
                "value": domain_brand.contactEmail,
            })
            time_slots.append({
                "groupName": "System",
                "key": "DropOfThreshold",
                "value": domain_brand.dropOffThreshold,
            }, )
            time_slots.append({
                "groupName": "System",
                "key": "HSTPercentage",
                "value": domain_brand.tax,
            })
            time_slots.append({
                "groupName": "MaxOrderPerSlot",
                "key": "DropOff",
                "value": "2",
            })
            time_slots.append({
                "groupName": "MaxOrderPerSlot",
                "key": "PickUp",
                "value": "2",
            })

        return Response({'results': time_slots, "paging": None,
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
