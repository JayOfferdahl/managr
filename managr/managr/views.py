from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader
from django.template.loader import get_template

def index(request):
    # TODO context should be user
    return HttpResponse(loader.get_template('base/index.html').render(request))
