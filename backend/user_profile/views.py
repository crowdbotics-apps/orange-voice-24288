import csv
from datetime import datetime
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse

profile_csv_header = [
    "id", "user", "phoneNo", "postalCode", "referralCode", "stripeCustomerId", "oneSignalPlayerId",
    "domain"
]


@login_required()
def driver_csv_export_view(request, queryset, user_type='customer'):
    response = HttpResponse(content_type='text/csv')
    now = datetime.now()

    response['Content-Disposition'] = 'attachment; filename="driver-list-%s.csv"' % now.timestamp()
    writer = csv.writer(response)
    # Create the HttpResponse object with the appropriate CSV header.
    business_csv_header = ['id', 'name', 'email', 'contactNumber', 'nationality', 'license', 'lat', 'lng',
                           'mainAddress',
                           'domain', 'last_sale_update']

    writer.writerow(business_csv_header)
    for profile in queryset.all():
        last_sale_update = ''
        order = profile.orders.first()
        if order:
            last_sale_update = order.created_on
        row_data = [
            profile.id,
            profile.name,
            profile.email,
            profile.contactNumber,
            profile.nationality,
            profile.license,
            profile.lat,
            profile.lng,
            profile.mainAddress,
            profile.domain.id if profile.domain else '',
            last_sale_update
        ]

        writer.writerow(row_data)
    return response


@login_required()
def profile_csv_export_view(request, queryset, user_type='customer'):
    response = HttpResponse(content_type='text/csv')
    now = datetime.now()

    response['Content-Disposition'] = 'attachment; filename="profile-list-%s.csv"' % now.timestamp()
    writer = csv.writer(response)
    # Create the HttpResponse object with the appropriate CSV header.
    business_csv_header = profile_csv_header
    business_csv_header.append('last_sale_update')

    writer.writerow(business_csv_header)
    for profile in queryset.all():
        last_sale_update = ''
        order = profile.orders.first()
        if order:
            last_sale_update = order.created_on
        row_data = [
            profile.id,
            profile.fullname(),
            profile.phoneNo,
            profile.postalCode,
            profile.referralCode,
            profile.stripeCustomerId,
            profile.domain.id,
            last_sale_update
        ]

        writer.writerow(row_data)
    return response


@login_required()
def business_csv_export_view(request, queryset):
    response = HttpResponse(content_type='text/csv')
    now = datetime.now()

    response['Content-Disposition'] = 'attachment; filename="business-list-%s.csv"' % now.timestamp()
    writer = csv.writer(response)
    # Create the HttpResponse object with the appropriate CSV header.
    business_csv_header = profile_csv_header
    business_csv_header.append('businessName')
    business_csv_header.append('businessAddress')

    writer.writerow(business_csv_header)
    for profile in queryset.all():
        row_data = [
            profile.id,
            profile.fullname(),
            profile.phoneNo,
            profile.postalCode,
            profile.referralCode,
            profile.stripeCustomerId,
            profile.domain.id,
            profile.businessName,
            profile.businessAddress
        ]

        writer.writerow(row_data)
    return response
