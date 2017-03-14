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
