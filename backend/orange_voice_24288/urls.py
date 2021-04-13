"""orange_voice_24288 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include, re_path
from django.views.decorators.csrf import csrf_exempt
from allauth.account.views import confirm_email
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from home.api.v1.viewsets import LoginViewToken, ResetPasswordViewToken, RegisterViewToken

urlpatterns = [
    path("admin/", admin.site.urls),

    path("accounts/", include("allauth.urls")),
    path("modules/", include("modules.urls")),
    path("api/v1/", include("home.api.v1.urls")),

    path("users/", include("users.urls", namespace="users")),
    path('rest-auth/login', csrf_exempt(LoginViewToken.as_view()), name='rest_login'),
    path('rest-auth/registration/', csrf_exempt(RegisterViewToken.as_view()), name='rest_register'),
    path('rest-auth/password/reset/', csrf_exempt(ResetPasswordViewToken.as_view()), name='rest_reset_password'),
    path("rest-auth/", include("rest_auth.urls")),
    # Override email confirm to use allauth's HTML view instead of rest_auth's API view
    path("rest-auth/registration/account-confirm-email/<str:key>/", confirm_email),
    path("rest-auth/registration/", include("rest_auth.registration.urls")),
    path('api/v1/', include([
        path("<int:domain>/", include("driver.api.v1.urls")),
        path("<int:domain>/", include("address.api.v1.urls")),
        path("<int:domain>/", include("location.api.v1.urls")),
        path("<int:domain>/", include("order.api.v1.urls")),
        path("<int:domain>/", include("service.api.v1.urls")),
        path("<int:domain>/", include("user_profile.api.v1.urls")),
        path("<int:domain>/", include("voucher.api.v1.urls")),
        path("<int:domain>/", include("faq.api.v1.urls")),
    ])),
    re_path(r'.*', include("home.urls")),
    path("home/", include("home.urls")),
]

admin.site.site_header = "Orange Voice"
admin.site.site_title = "Orange Voice Admin Portal"
admin.site.index_title = "Orange Voice Admin"

# swagger
api_info = openapi.Info(
    title="Orange Voice API",
    default_version="v1",
    description="API documentation for Orange Voice App",
)

schema_view = get_schema_view(
    api_info,
    public=True,
    permission_classes=(permissions.IsAuthenticated,),
)

urlpatterns += [
    path("api-docs/", schema_view.with_ui("swagger", cache_timeout=0), name="api_docs")
]
