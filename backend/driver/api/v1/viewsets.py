from rest_framework import authentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from driver.models import Driver
from home.api.v1.serializers import TokenSerializer
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

    def get_queryset(self, **args):
        queryset = Driver.objects.search(self.kwargs, params=self.request.query_params)
        return queryset

    def get_serializer_context(self):
        import pprint
        pp = pprint.PrettyPrinter()
        pp.pprint(self.request.get_host())
        context = super().get_serializer_context()
        context['domain'] = self.kwargs.get('domain')
        return context


class DriverSignInAPIView(APIView):
    permission_classes = (AllowAny,)

    authentication_classes = ()

    def post(self, request, domain=None):
        licence = request.data.get('licence')
        print(licence, request.data)
        driver_qs = Driver.objects.filter(license=licence, domain_id=domain)
        if not driver_qs.exists():
            raise serializers.ValidationError(
                {"message": "Driver with that license does not exist."}
            )
        user = driver_qs.first().user

        token, _ = Token.objects.get_or_create(user=user)
        data = TokenSerializer(token).data
        data['driverId'] = driver_qs.first().id

        return Response(data=data, status=status.HTTP_201_CREATED)
