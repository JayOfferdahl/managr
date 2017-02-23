from django.core.exceptions import ValidationError
from django.http import JsonResponse
from django.utils.six import BytesIO
from django.views.decorators.csrf import csrf_exempt

from rest_framework import serializers
from rest_framework.parsers import JSONParser

from managr_entities.app_forms.registration_form import RegistrationForm
from managr_entities.app_models.managr_user import ManagrUser

@csrf_exempt
def register(request):
	registration_data = JSONParser().parse(BytesIO(request.body))
	registration_form = RegistrationForm(registration_data)
	
	if registration_form.is_valid():
		ManagrUser.objects.register_user(registration_data)
		return JsonResponse({'success': 'Signup Successful'})
	else:
		errors = dict([(key, [str(error) for error in value]) for key, value in registration_form.errors.items()])
		return JsonResponse(errors)

	return JsonResponse(registration_data)
