from enum import Enum


class OrderStatusEnum(Enum):
    OrderPlaced = 'OrderPlaced'
    PickUp = 'PickUp'
    InProgress = 'InProgress'
    DropOff = 'DropOff'
    Delivered = 'Delivered'
    Cancelled = 'Canceled'
