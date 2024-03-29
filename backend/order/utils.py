def validate_search_order_params(params={}):
    validated_params = {}

    if params.get('pickupDate'):
        validated_params['pickupDate__icontains'] = params.get('pickupDate')
    if params.get('status'):
        validated_params['status__icontains'] = params.get('status')

    return validated_params


time_slots = [
    {
        "groupName": "DropOffTimeSlot",
        "key": "Slot11",
        "value": "07:00 PM - 08:00 PM",
        "id": 40,
        "createdBy": 0,
        "createdOn": "2020-12-17T09:18:50.253",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-12-17T09:18:50.253",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "DropOffTimeSlot",
        "key": "Slot10",
        "value": "06:00 PM - 07:00 PM",
        "id": 39,
        "createdBy": 0,
        "createdOn": "2020-12-17T09:18:50.253",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-12-17T09:18:50.253",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "DropOffTimeSlot",
        "key": "Slot9",
        "value": "05:00 PM - 06:00 PM",
        "id": 38,
        "createdBy": 0,
        "createdOn": "2020-12-17T09:18:50.253",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-12-17T09:18:50.253",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "TimeSlot",
        "key": "Slot11",
        "value": "07:00 PM - 08:00 PM",
        "id": 37,
        "createdBy": 0,
        "createdOn": "2020-12-17T09:18:50.253",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-12-17T09:18:50.253",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "TimeSlot",
        "key": "Slot10",
        "value": "06:00 PM - 07:00 PM",
        "id": 36,
        "createdBy": 0,
        "createdOn": "2020-12-17T09:18:50.253",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-12-17T09:18:50.253",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "TimeSlot",
        "key": "Slot9",
        "value": "05:00 PM - 06:00 PM",
        "id": 35,
        "createdBy": 0,
        "createdOn": "2020-12-17T09:18:50.253",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-12-17T09:18:50.253",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "MaxOrderPerSlot",
        "key": "DropOff",
        "value": "2",
        "id": 22,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.223",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-05-12T09:18:50.223",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "MaxOrderPerSlot",
        "key": "PickUp",
        "value": "2",
        "id": 21,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.223",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-05-12T09:18:50.223",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "DropOffTimeSlot",
        "key": "Slot8",
        "value": "04:00 PM - 05:00 PM",
        "id": 20,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.223",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-05-12T09:18:50.223",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "DropOffTimeSlot",
        "key": "Slot7",
        "value": "03:00 PM - 04:00 PM",
        "id": 19,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.223",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-05-12T09:18:50.223",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "DropOffTimeSlot",
        "key": "Slot6",
        "value": "02:00 PM - 03:00 PM",
        "id": 18,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.223",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-05-12T09:18:50.223",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "DropOffTimeSlot",
        "key": "Slot5",
        "value": "01:00 PM - 02:00 PM",
        "id": 17,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.223",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-05-12T09:18:50.223",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "DropOffTimeSlot",
        "key": "Slot4",
        "value": "12:00 PM - 01:00 PM",
        "id": 16,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.223",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-05-12T09:18:50.223",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "DropOffTimeSlot",
        "key": "Slot3",
        "value": "11:00 AM - 12:00 PM",
        "id": 15,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.223",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-05-12T09:18:50.223",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "DropOffTimeSlot",
        "key": "Slot2",
        "value": "10:00 AM - 11:00 AM",
        "id": 14,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.223",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-05-12T09:18:50.223",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "DropOffTimeSlot",
        "key": "Slot1",
        "value": "09:00 AM - 10:00 AM",
        "id": 13,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.223",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-05-12T09:18:50.223",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "TimeSlot",
        "key": "Slot8",
        "value": "04:00 PM - 05:00 PM",
        "id": 12,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.597",
        "lastModifiedBy": None,
        "lastModifiedOn": None,
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "TimeSlot",
        "key": "Slot7",
        "value": "03:00 PM - 04:00 PM",
        "id": 11,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.55",
        "lastModifiedBy": None,
        "lastModifiedOn": None,
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "TimeSlot",
        "key": "Slot6",
        "value": "02:00 PM - 03:00 PM",
        "id": 10,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.533",
        "lastModifiedBy": None,
        "lastModifiedOn": None,
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "TimeSlot",
        "key": "Slot5",
        "value": "01:00 PM - 02:00 PM",
        "id": 9,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.503",
        "lastModifiedBy": None,
        "lastModifiedOn": None,
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "TimeSlot",
        "key": "Slot4",
        "value": "12:00 PM - 01:00 PM",
        "id": 8,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.41",
        "lastModifiedBy": None,
        "lastModifiedOn": None,
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "TimeSlot",
        "key": "Slot3",
        "value": "11:00 AM - 12:00 PM",
        "id": 7,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.347",
        "lastModifiedBy": None,
        "lastModifiedOn": None,
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "TimeSlot",
        "key": "Slot2",
        "value": "10:00 AM - 11:00 AM",
        "id": 6,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.253",
        "lastModifiedBy": None,
        "lastModifiedOn": None,
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "TimeSlot",
        "key": "Slot1",
        "value": "09:00 AM - 10:00 AM",
        "id": 5,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.223",
        "lastModifiedBy": None,
        "lastModifiedOn": None,
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "System",
        "key": "ContactEmail",
        "value": "info@laundrez.ca",
        "id": 3,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.177",
        "lastModifiedBy": None,
        "lastModifiedOn": None,
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "System",
        "key": "DropOfThreshold",
        "value": "48",
        "id": 2,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.143",
        "lastModifiedBy": None,
        "lastModifiedOn": None,
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "System",
        "key": "HSTPercentage",
        "value": "13",
        "id": 1,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.097",
        "lastModifiedBy": None,
        "lastModifiedOn": None,
        "isDeleted": False,
        "operationType": 0
    }
]

lovs = [
    {
        "groupName": "DropOffTimeSlot",
        "key": "Slot11",
        "value": "07:00 PM - 08:00 PM",
        "id": 28,
        "createdBy": 0,
        "createdOn": "2020-12-17T09:18:50.253",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-12-17T09:18:50.253",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "DropOffTimeSlot",
        "key": "Slot10",
        "value": "06:00 PM - 07:00 PM",
        "id": 27,
        "createdBy": 0,
        "createdOn": "2020-12-17T09:18:50.253",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-12-17T09:18:50.253",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "DropOffTimeSlot",
        "key": "Slot9",
        "value": "05:00 PM - 06:00 PM",
        "id": 26,
        "createdBy": 0,
        "createdOn": "2020-12-17T09:18:50.253",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-12-17T09:18:50.253",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "TimeSlot",
        "key": "Slot11",
        "value": "07:00 PM - 08:00 PM",
        "id": 25,
        "createdBy": 0,
        "createdOn": "2020-12-17T09:18:50.253",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-12-17T09:18:50.253",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "TimeSlot",
        "key": "Slot10",
        "value": "06:00 PM - 07:00 PM",
        "id": 24,
        "createdBy": 0,
        "createdOn": "2020-12-17T09:18:50.253",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-12-17T09:18:50.253",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "TimeSlot",
        "key": "Slot9",
        "value": "05:00 PM - 06:00 PM",
        "id": 23,
        "createdBy": 0,
        "createdOn": "2020-12-17T09:18:50.253",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-12-17T09:18:50.253",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "MaxOrderPerSlot",
        "key": "DropOff",
        "value": "2",
        "id": 22,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.223",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-05-12T09:18:50.223",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "MaxOrderPerSlot",
        "key": "PickUp",
        "value": "2",
        "id": 21,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.223",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-05-12T09:18:50.223",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "DropOffTimeSlot",
        "key": "Slot8",
        "value": "04:00 PM - 05:00 PM",
        "id": 20,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.223",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-05-12T09:18:50.223",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "DropOffTimeSlot",
        "key": "Slot7",
        "value": "03:00 PM - 04:00 PM",
        "id": 19,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.223",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-05-12T09:18:50.223",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "DropOffTimeSlot",
        "key": "Slot6",
        "value": "02:00 PM - 03:00 PM",
        "id": 18,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.223",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-05-12T09:18:50.223",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "DropOffTimeSlot",
        "key": "Slot5",
        "value": "01:00 PM - 02:00 PM",
        "id": 17,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.223",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-05-12T09:18:50.223",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "DropOffTimeSlot",
        "key": "Slot4",
        "value": "12:00 PM - 01:00 PM",
        "id": 16,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.223",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-05-12T09:18:50.223",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "DropOffTimeSlot",
        "key": "Slot3",
        "value": "11:00 AM - 12:00 PM",
        "id": 15,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.223",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-05-12T09:18:50.223",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "DropOffTimeSlot",
        "key": "Slot2",
        "value": "10:00 AM - 11:00 AM",
        "id": 14,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.223",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-05-12T09:18:50.223",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "DropOffTimeSlot",
        "key": "Slot1",
        "value": "09:00 AM - 10:00 AM",
        "id": 13,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.223",
        "lastModifiedBy": 0,
        "lastModifiedOn": "2020-05-12T09:18:50.223",
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "TimeSlot",
        "key": "Slot8",
        "value": "04:00 PM - 05:00 PM",
        "id": 12,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.597",
        "lastModifiedBy": None,
        "lastModifiedOn": None,
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "TimeSlot",
        "key": "Slot7",
        "value": "03:00 PM - 04:00 PM",
        "id": 11,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.55",
        "lastModifiedBy": None,
        "lastModifiedOn": None,
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "TimeSlot",
        "key": "Slot6",
        "value": "02:00 PM - 03:00 PM",
        "id": 10,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.533",
        "lastModifiedBy": None,
        "lastModifiedOn": None,
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "TimeSlot",
        "key": "Slot5",
        "value": "01:00 PM - 02:00 PM",
        "id": 9,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.503",
        "lastModifiedBy": None,
        "lastModifiedOn": None,
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "TimeSlot",
        "key": "Slot4",
        "value": "12:00 PM - 01:00 PM",
        "id": 8,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.41",
        "lastModifiedBy": None,
        "lastModifiedOn": None,
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "TimeSlot",
        "key": "Slot3",
        "value": "11:00 AM - 12:00 PM",
        "id": 7,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.347",
        "lastModifiedBy": None,
        "lastModifiedOn": None,
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "TimeSlot",
        "key": "Slot2",
        "value": "10:00 AM - 11:00 AM",
        "id": 6,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.253",
        "lastModifiedBy": None,
        "lastModifiedOn": None,
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "TimeSlot",
        "key": "Slot1",
        "value": "09:00 AM - 10:00 AM",
        "id": 5,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.223",
        "lastModifiedBy": None,
        "lastModifiedOn": None,
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "System",
        "key": "ContactEmail",
        "value": "info@laundrez.ca",
        "id": 3,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.177",
        "lastModifiedBy": None,
        "lastModifiedOn": None,
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "System",
        "key": "DropOfThreshold",
        "value": "48",
        "id": 2,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.143",
        "lastModifiedBy": None,
        "lastModifiedOn": None,
        "isDeleted": False,
        "operationType": 0
    },
    {
        "groupName": "System",
        "key": "HSTPercentage",
        "value": "13",
        "id": 1,
        "createdBy": 0,
        "createdOn": "2020-05-12T09:18:50.097",
        "lastModifiedBy": None,
        "lastModifiedOn": None,
        "isDeleted": False,
        "operationType": 0
    }
]

default_time_slots = [
    {
        "start": "9:00",
        "end": "10:00"
    },
    {
        "start": "10:00",
        "end": "11:00"
    },
    {
        "start": "11:00",
        "end": "12:00"
    }, {
        "start": "12:00",
        "end": "13:00"
    }, {
        "start": "13:00",
        "end": "14:00"
    }, {
        "start": "14:00",
        "end": "15:00"
    }, {
        "start": "15:00",
        "end": "16:00"
    }, {
        "start": "17:00",
        "end": "18:00"
    }, {
        "start": "18:00",
        "end": "19:00"
    }, {
        "start": "19:00",
        "end": "20:00"
    },
]
