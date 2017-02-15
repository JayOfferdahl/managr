from django.http import JsonResponse
from django.shortcuts import render
from django.template import loader
from django.template.loader import get_template
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def index(request):
    # TODO context should be user
    data = {
    	'django_string': 'Hello from Managr Django'
    }
    return JsonResponse(data)
