def validate_search_profile_params(params={}):
    validated_params = {}

    if params.get('type'):
        validated_params['user__groups__name__contains'] = params.get('type')

    return validated_params
