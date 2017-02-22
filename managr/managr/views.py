from django.http import JsonResponse
from django.shortcuts import render
from django.template import loader
from django.template.loader import get_template
from django.utils.six import BytesIO
from django.views.decorators.csrf import csrf_exempt

from rest_framework.parsers import JSONParser

def index(request):
    # TODO context should be user
    data = {
    	'django_string': 'Hello from the Managr Server'
    }
    return JsonResponse(data)

@csrf_exempt
def register(request):
	data = JSONParser().parse(BytesIO(request.body))
	print('User tried to signup with the following attributes')
	print(data['first_name'], data['last_name'], data['username'], data['email'], data['password'], data['password_confirmation'])
	return JsonResponse(data)
