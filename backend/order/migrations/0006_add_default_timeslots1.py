from django.db import migrations
from order.utils import default_time_slots
from order.models import TimeSlot
from domain.models import Domain
from core.utils import update_object


def create_default_timeslots(_, __):
    for domain in Domain.objects.all():
        for slot in default_time_slots:
            update_object(TimeSlot(domain_id=domain.id, ), slot)


class Migration(migrations.Migration):
    dependencies = [
        ('order', '0005_timeslot')
    ]

    operations = [
        migrations.RunPython(create_default_timeslots, reverse_code=migrations.RunPython.noop)
    ]
