from .enums import UserGroups
from .models import User
from django.contrib.auth import get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse
from django.views.generic import (
    RedirectView,
    ListView,
    CreateView,
    DetailView,
    UpdateView,
)
from rest_framework import authentication, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

User = get_user_model()


class UserDetailView(LoginRequiredMixin, DetailView):
    model = User
    slug_field = "username"
    slug_url_kwarg = "username"


user_detail_view = UserDetailView.as_view()


class UserUpdateView(LoginRequiredMixin, UpdateView):
    model = User
    fields = ["name"]

    def get_success_url(self):
        return reverse("users:detail", kwargs={"username": self.request.user.username})

    def get_object(self):
        return User.objects.get(username=self.request.user.username)


user_update_view = UserUpdateView.as_view()


class UserRedirectView(LoginRequiredMixin, RedirectView):
    permanent = False

    def get_redirect_url(self):
        return reverse("users:detail", kwargs={"username": self.request.user.username})


user_redirect_view = UserRedirectView.as_view()


class UserView(APIView):
    authentication_classes = [authentication.TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get(self, request, format=None):
        user = request.user
        return Response({
            "result": {
                "profile_id": user.profile.id,
                "firstName": user.first_name,
                "lastName": user.last_name,
                "email": user.email,
                "phoneNo": user.profile.phoneNo,
                "postalCode": user.profile.postalCode,
                "role": user.groups.first().name if user.groups.all().exists() else UserGroups.customer.name,
                "referralCode": user.profile.referralCode,
            }
        })
