from django.http import JsonResponse
from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt

from project_proposal.app_models.proposal import Proposal

@csrf_exempt
def newProposal(request):
    print("newProject(request) heehurr")
    pass


@csrf_exempt
def updateProposal(request):
    pass