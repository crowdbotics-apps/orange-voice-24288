from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from .views import (
    user_redirect_view,
    UserUpdateView,
    user_detail_view,
    user_update_view,
    UserDetailView, UserView
)

app_name = "users"
urlpatterns = [
    path("~redirect/", view=user_redirect_view, name="redirect"),
    path("~update/", view=user_update_view, name="update"),
    path("<str:username>/", view=user_detail_view, name="detail"),
    path("users/<int:pk>/detail/", UserDetailView.as_view(), name="user_detail"),
    path("me", UserView.as_view(), name='me'),
    path("users/<int:pk>/update/", csrf_exempt(UserUpdateView.as_view()), name="update_user"),
]
