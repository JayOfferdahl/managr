from django.http import JsonResponse
from django.utils.six import BytesIO
from django.views.decorators.csrf import csrf_exempt

from rest_framework.parsers import JSONParser

from managr_entities.app_forms.registration_form import RegistrationForm

@csrf_exempt
def register(request):
	data = JSONParser().parse(BytesIO(request.body))
	print('User tried to signup with the following attributes')
	print(data['first_name'], data['last_name'], data['username'], data['email'], data['password'], data['password_confirmation'])
	#form = RegistrationForm(data)
	#print(form.errors.as_json())
	return JsonResponse(data)
