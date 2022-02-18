import csv
from datetime import datetime
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse

list_display = ['id', 'status', 'Customer', 'orderAmount', 'totalAmount', 'discountAmount', 'taxPercentage',
                'pickupTime', 'pickupDate', 'dropoffTime', 'dropoffDate', 'address', 'driver', 'description']


@login_required()
def order_csv_export_view(request, queryset):
    response = HttpResponse(content_type='text/csv')
    now = datetime.now()

    response['Content-Disposition'] = 'attachment; filename="orders-list-%s.csv"' % now.timestamp()
    writer = csv.writer(response)
    # Create the HttpResponse object with the appropriate CSV header.

    writer.writerow(list_display)
    for data in queryset.all():
        row_data = [
            data.id,
            data.status,
            data.profile.fullname() if data.profile else '',
            data.orderAmount,
            data.totalAmount,
            data.discountAmount,
            data.taxPercentage,
            data.pickupTime,
            data.pickupDate,
            data.dropoffTime,
            data.dropoffDate,
            data.address,
            data.driver,
            data.description
        ]

        writer.writerow(row_data)
    return response

