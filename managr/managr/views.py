from django.http import JsonResponse
from django.shortcuts import render
from django.template import loader
from django.template.loader import get_template

def index(request):
    # TODO context should be user
    data = {
    	'django_string': 'Hello from the Managr Server'
    }
    return JsonResponse(data)
