from django.http import JsonResponse
from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt

from project_proposal.app_models.proposal import Proposal
from project_proposal.app_forms.proposal_form import ProposalForm

from rest_framework.parsers import JSONParser
from django.utils.six import BytesIO
from django.core import serializers

@csrf_exempt
def newProposal(request):
    proposal_data = JSONParser().parse(BytesIO(request.body))
    proposal_form = ProposalForm(proposal_data)

    print("We have received a proposal request.")

    if proposal_form.is_valid():
        print("ASDF!!")
        proposal = Proposal.objects.create_proposal(proposal_data)
        return JsonResponse({'success': 'Your project proposal was successfully created!'})
    else:
        print("SADF??")
        errors = dict([(key, [str(error) for error in value]) for key, value in proposal_form.errors.items()])
        return JsonResponse(errors)

@csrf_exempt
def updateProposal(request):
    pass

#def buildProposalsDictionary():
#    proposals = Proposal.objects.all()
#    proposalDict = dict()
#    for()
@csrf_exempt
def showProposals(request):
#    return JsonResponse(buildProposalsDictionary())
    return JsonResponse(serializers.serialize('json', Proposal.objects.all(), fields = 'title'), safe = False)
