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

    if proposal_form.is_valid():
        print("Proposal request - valid (Debug statement - project_proposal/views.py)")
        proposal = Proposal.objects.create_proposal(proposal_data)
        return JsonResponse({'success': 'Your project proposal was successfully created!'})
    else:
        print("Proposal request - invalid (Debug statement - project_proposal/views.py)")
        errors = dict([(key, [str(error) for error in value]) for key, value in proposal_form.errors.items()])
        return JsonResponse(errors)

@csrf_exempt
def updateProposal(request):
    pass

def buildProposalsList():
    proposals = Proposal.objects.all()
    proposalList = list()
    for proposal in proposals:
        proposalList.append({
            "name":     proposal.title,
            "location": proposal.address,
            "budget":   proposal.budget,
            "start":    proposal.start_date,
            "end":      proposal.end_date
            })
    print(proposalList)
    return proposalList
@csrf_exempt
def showProposals(request):
    return JsonResponse(buildProposalsList(), safe = False)
    #return JsonResponse(serializers.serialize('json', Proposal.objects.all(), fields = 'title, address, budget, start_date, end_date'), safe = False)
