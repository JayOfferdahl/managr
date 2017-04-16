from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.utils.six import BytesIO

from collections import OrderedDict
from rest_framework.parsers import JSONParser

from managr_entities.app_models.managr_user import ManagrUser
from project_proposal.app_models.proposal import Proposal
from project_proposal.app_forms.proposal_form import ProposalForm

# Creates a new proposal object in the database assigned to the requesting user.
# Error messages returned if the form is invalid or the user doesn't exist.
@csrf_exempt
def newProposal(request):
    proposal_data = JSONParser().parse(BytesIO(request.body))
    proposal_form = ProposalForm(proposal_data)

    if proposal_form.is_valid():
        print("Proposal request - valid (Debug statement - project_proposal/views.py)")

        # Validate user exists
        try:
            user = ManagrUser.objects.get(session_token = proposal_data['token'])
        except ManagrUser.DoesNotExist:
            return JsonResponse({'error': 'Invalid session token.'})

        proposal = Proposal.objects.create_proposal(user, proposal_data)
        return JsonResponse({'success': 'Your project proposal was successfully created!'})
    else:
        print("Proposal request - invalid (Debug statement - project_proposal/views.py)")
        errors = dict([(key, [str(error) for error in value]) for key, value in proposal_form.errors.items()])
        return JsonResponse(errors)

# Updates a proposal object in the database belonging to the requesting user.
# Error messages returned if the form is invalid or the user/proposal doesn't exist.
@csrf_exempt
def updateProposal(request):
    proposal_data = JSONParser().parse(BytesIO(request.body))
    proposal_form = ProposalForm(proposal_data)

    if proposal_form.is_valid():
        print("Proposal update request - valid (Debug statement - project_proposal/views.py)")
        
        # Validate proposal object & user object exist
        try:
            user = ManagrUser.objects.get(session_token = proposal_data['token'])
            proposal = Proposal.objects.get(project_uuid = proposal_data['proposal_uuid'])
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'Invalid request.'})

        # proposal = Proposal.objects.create_proposal(user, proposal_data)
        print("Updated proposal (even though not really).")
        return JsonResponse({'success': 'Your project proposal was successfully created!'})
    else:
        print("Proposal update request - invalid (Debug statement - project_proposal/views.py)")
        errors = dict([(key, [str(error) for error in value]) for key, value in proposal_form.errors.items()])
        return JsonResponse(errors)

# Returns an ordered dictionary of proposals with their titles as keys and their proposal_uuids
# as values. The proposal_uuids are used to link the front end to a specific proposal.
# Note: returns proposals belonging only to the requesting user
@csrf_exempt
def getUserProposalMetadata(request):
    session_token = JSONParser().parse(BytesIO(request.body))

    if session_token:
        # Validate user exists
        try:
            user = ManagrUser.objects.get(session_token = session_token)
        except ManagrUser.DoesNotExist:
            return JsonResponse({'error': 'Invalid request.'})

        # Generate a list of project proposals and their ids
        proposals = Proposal.objects.filter(owner = user).order_by('title')

        proposal_metadata = OrderedDict()

        for proposal in proposals:
            proposal_metadata[proposal.title] = proposal.proposal_uuid

        return JsonResponse({
            'success': 'Proposals returned for user.',
            'data': proposal_metadata
        })
    else:
        return JsonResponse({'error': 'Invalid session token.'})

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

# Returns a proposal object based on the proposal_uuid. If the requesting user owns the requested
# proposal, a flag is set to true indicating so. In either case, the entire proposal is returned.
@csrf_exempt
def getProposal(request):
    request_data = JSONParser().parse(BytesIO(request.body))

    proposal_uuid = request_data['proposal_uuid']
    session_token = request_data['session_token']

    if session_token and proposal_uuid:
        # Validate proposal object & user object exist
        try:
            proposal = Proposal.objects.get(proposal_uuid = proposal_uuid)
            user = ManagrUser.objects.get(session_token = session_token)
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'Invalid request.'})
        
        # Check owner
        if proposal.owner == user:
            print("Request for proposal by owner. (Debug statement - project_proposal/views.py)")
            requestOwnsProposal = True
        else:
            print("Request for proposal by viewer. (Debug statement - project_proposal/views.py)")
            requestOwnsProposal = False

        # Create proposal response
        proposalResponse = {
            "title": proposal.title,
            "address": proposal.address,
            "contact_number": proposal.contact_number,
            "budget": proposal.budget,
            "start_date": proposal.start_date,
            "end_date": proposal.end_date,
            "description": proposal.details['description'],
        }

        return JsonResponse({
            'success': True,
            'owner': requestOwnsProposal,
            'proposal': proposalResponse
        })

# Removes a proposal object from the database. Ensures the requesting using owns the proposal
# object before deleting it.
@csrf_exempt
def deleteProposal(request):
    request_data = JSONParser().parse(BytesIO(request.body))

    proposal_uuid = request_data['proposal_uuid']
    session_token = request_data['session_token']

    if session_token and proposal_uuid:
        # Validate proposal object & user object exist
        try:
            proposal = Proposal.objects.get(proposal_uuid = proposal_uuid)
            user = ManagrUser.objects.get(session_token = session_token)
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'Invalid request.'})
        
        # Check owner
        if proposal.owner == user:
            print("Request for proposal delete by owner. (Debug statement - project_proposal/views.py)")
            proposal.delete()
            print("Proposal deleted by owner. (Debug statement - project_proposal/views.py)")
            return JsonResponse({'success': True })
        else:
            print("Request for proposal delete by viewer. (Debug statement - project_proposal/views.py)")
            return JsonResponse({'error': 'Invalid session token.'})
    else:
        return JsonResponse({'error': 'Invalid session token.'})
