def validate_search_params(params):
    allowed_params = ['profile']
    validated_params = {}
    for param in allowed_params:
        if param in params.keys():
            validated_params[param] = params.get(param)
    return validated_params