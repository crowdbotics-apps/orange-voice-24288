def update_object(instance, data):
    """
    Update any model instance with data
    :param instance: Model instance
    :param data: dictionary containing model fields as keys and values as value
    :return: model instance
    """
    for key, value in data.items():
        setattr(instance, key, value)
    instance.save()
    return instance
