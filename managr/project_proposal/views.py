from django.http import JsonResponse
from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt

from managr_entities.app_models.managr_user import ManagrUser
from project_proposal.app_models.proposal import Proposal
from project_proposal.app_forms.proposal_form import ProposalForm

from rest_framework.parsers import JSONParser
from django.utils.six import BytesIO
from django.forms.models import model_to_dict
#from django.core import serializers

from collections import OrderedDict

@csrf_exempt
def newProposal(request):
    proposal_data = JSONParser().parse(BytesIO(request.body))
    proposal_form = ProposalForm(proposal_data)

    if proposal_form.is_valid():
        print("Proposal request - valid (Debug statement - project_proposal/views.py)")
        user = ManagrUser.objects.get(session_token=proposal_data['token'])
        proposal = Proposal.objects.create_proposal(user, proposal_data)
        return JsonResponse({'success': 'Your project proposal was successfully created!'})
    else:
        print("Proposal request - invalid (Debug statement - project_proposal/views.py)")
        errors = dict([(key, [str(error) for error in value]) for key, value in proposal_form.errors.items()])
        return JsonResponse(errors)

@csrf_exempt
def updateProposal(request):
    pass

@csrf_exempt
def getUserProposalMetadata(request):
    session_token = JSONParser().parse(BytesIO(request.body))

    print(session_token)

    if session_token:
        user = ManagrUser.objects.get(session_token=session_token)
        if user:
            # Generate a list of project proposals and their ids
            proposals = Proposal.objects.filter(owner=user).order_by('title')

            proposal_metadata = OrderedDict()

            for proposal in proposals:
                proposal_metadata[proposal.title] = proposal.start_date

            return JsonResponse({
                'success': 'Proposals returned for user.',
                'data': proposal_metadata
            })
        else:
            return JsonResponse({'error': 'Invalid session token.'})
    else:
        return JsonResponse({'error': 'No session token provided.'})

def buildProposalsList():
    proposals = Proposal.objects.all()
    proposalList = list()
    for proposal in proposals:
        proposalList.append({
            "name":     proposal.title,
            "location": proposal.address,
            "budget":   proposal.budget,
            "start":    proposal.start_date,
            "end":      proposal.end_date,
            "uuid":     proposal.proposal_uuid
            })
    return proposalList

@csrf_exempt
def showProposals(request):
    return JsonResponse(buildProposalsList(), safe = False)
    #return JsonResponse(serializers.serialize('json', Proposal.objects.all(), fields = 'title, address, budget, start_date, end_date'), safe = False)

@csrf_exempt
def getProposal(request):
    my_proposal = Proposal.objects.get(proposal_uuid = request.body.decode("utf-8"))
    if my_proposal:
        print(model_to_dict(my_proposal))
        return JsonResponse([model_to_dict(my_proposal)], safe = False)
    else:
        return JsonResponse('error, proposal not found')
