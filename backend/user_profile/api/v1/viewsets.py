from rest_framework import authentication
from rest_framework.permissions import IsAuthenticated

from user_profile.models import Profile
from .serializers import (
    ProfileSerializer,
)
from rest_framework import viewsets


class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    authentication_classes = (
        authentication.TokenAuthentication,
        authentication.SessionAuthentication,
    )
    permission_classes = [IsAuthenticated]
    queryset = Profile.objects.all()

    def get_queryset(self):
        search_query = self.request.query_params.get('search', None)
        queryset = Profile.objects.search(search_query, params=self.request.query_params)
        return queryset
