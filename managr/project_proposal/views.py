from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.utils.six import BytesIO

from collections import OrderedDict
from rest_framework.parsers import JSONParser
import json

from managr_entities.app_models.managr_user import ManagrUser
from project_proposal.app_models.proposal import Proposal
from project_proposal.app_forms.proposal_form import ProposalForm
from project_proposal.app_models.bid import Bid
from project_proposal.app_forms.bid_form import BidForm

from project_management.app_models.project import Project

# Formats a contact number (10 digits) into a readable format of '(xxx) xxx-xxxx'
def prettyFormatContact(contactNumber):
    # Build a new string
    formattedContact = "("
    i = 0

    for c in contactNumber:
        if c.isdigit():
            formattedContact += c
            i += 1
            if i == 3:
                formattedContact += ") "
            elif i == 6:
                formattedContact += "-"

    return formattedContact


# Creates a new proposal object in the database assigned to the requesting user.
# Error messages returned if the form is invalid or the user doesn't exist.
@csrf_exempt
def newProposal(request):
    proposal_data = JSONParser().parse(BytesIO(request.body))
    proposal_form = ProposalForm(proposal_data)

    if proposal_form.is_valid():
        # Validate user exists
        try:
            user = ManagrUser.objects.get(session_token = proposal_data['token'])
        except ManagrUser.DoesNotExist:
            return JsonResponse({'error': 'Invalid request.'})

        proposal = Proposal.objects.create_proposal(user.company, proposal_data)
        return JsonResponse({'success': proposal.proposal_uuid})
    else:
        errors = dict([(key, [str(error) for error in value]) for key, value in proposal_form.errors.items()])
        return JsonResponse(errors)


# Updates a proposal object in the database belonging to the requesting user.
# Error messages returned if the form is invalid or the user/proposal doesn't exist.
@csrf_exempt
def updateProposal(request):
    proposal_data = JSONParser().parse(BytesIO(request.body))
    proposal_form = ProposalForm(proposal_data)

    if proposal_form.is_valid():
        # Validate proposal object & user object exist
        try:
            user = ManagrUser.objects.get(session_token = proposal_data['token'])
            proposal = Proposal.objects.get(proposal_uuid = proposal_data['proposal_uuid'])
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'Invalid request.'})

        if proposal.active == False:
            return JsonResponse({'error': 'Invalid request.'})

        if proposal.owner == user.company:
            proposal = Proposal.objects.update_proposal(proposal, proposal_data)
            return JsonResponse({'success': proposal.proposal_uuid})
        else:
            return JsonResponse({'error': 'Invalid request.'})
    else:
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
        proposals = Proposal.objects.filter(owner = user.company).exclude(active = False).order_by('title')

        proposal_metadata = OrderedDict()

        for proposal in proposals:
            bidsExist = Bid.objects.filter(corresponding_proposal__proposal_uuid = proposal.proposal_uuid).exclude(bid_declined = True).count() > 0
            metadata = {'proposal_uuid': proposal.proposal_uuid, 'flagged': bidsExist}
            proposal_metadata[proposal.title] = metadata

        return JsonResponse({
            'success': 'Proposals returned for user.',
            'data': proposal_metadata
        })
    else:
        return JsonResponse({'error': 'Invalid request.'})


def buildProposalsList(user):
    proposals = Proposal.objects.exclude(owner = user.company).exclude(active = False)
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


# Returns all proposals not created by the requesting user
@csrf_exempt
def showProposals(request):
    session_token = JSONParser().parse(BytesIO(request.body))

    if session_token:
        # Validate user exists
        try:
            user = ManagrUser.objects.get(session_token = session_token)
        except ManagrUser.DoesNotExist:
            return JsonResponse({'error': 'Invalid request.'})
    return JsonResponse(buildProposalsList(user), safe = False)


# Returns a proposal object based on the proposal_uuid. If the requesting user owns the requested
# proposal, a flag is set to true indicating so. In either case, the entire proposal is returned.
# If the user does not own the proposal, it checks if they have a bid on the proposal.
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
        
        bidResponse = {
            "exists": False,
        }

        # Check owner
        if proposal.owner == user.company:
            requestOwnsProposal = True
        else:
            requestOwnsProposal = False

            try:
                bid = Bid.objects.get(owner = user.company, corresponding_proposal__proposal_uuid = proposal_uuid)
                bidResponse = {
                    "exists": True,
                    "contact_number": prettyFormatContact(bid.contact_number),
                    "budget": bid.budget,
                    "start_date": bid.start_date,
                    "end_date": bid.end_date,
                    "description": bid.details['description'],
                    "bid_declined": bid.bid_declined,
                    "proposal_removed": bid.proposal_removed,
                }
            # If the bid doesn't exist, return nothing
            except Bid.DoesNotExist:
                pass

        # Create proposal response
        proposalResponse = {
            "title": proposal.title,
            "address": proposal.address,
            "contact_number": prettyFormatContact(proposal.contact_number),
            "budget": proposal.budget,
            "start_date": proposal.start_date,
            "end_date": proposal.end_date,
            "description": proposal.details['description'],
            "active": proposal.active
        }

        return JsonResponse({
            'success': True,
            'owner': requestOwnsProposal,
            'proposal': proposalResponse,
            'bid': bidResponse,
        })
    else:
        return JsonResponse({'error': 'Invalid request.'})


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
        if proposal.owner == user.company:
            Bid.objects.deactivate_proposal(proposal)
            Proposal.objects.deactivate(proposal)
            return JsonResponse({'success': True })

    return JsonResponse({'error': 'Invalid request.'})


# Creates a new bid object in the database assigned to the requesting user.
# Error messages returned if the form is invalid or the user doesn't exist.
@csrf_exempt
def newBid(request):
    bid_data = JSONParser().parse(BytesIO(request.body))
    bid_form = BidForm(bid_data)

    if bid_form.is_valid():
        # Validate user & proposal exists
        try:
            user = ManagrUser.objects.get(session_token = bid_data['token'])
            proposal = Proposal.objects.get(proposal_uuid = bid_data['proposal_uuid'])
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'Invalid request.'})

        if proposal.active == False:
            return JsonResponse({'error': 'Invalid request.'})

        bid = Bid.objects.create_bid(user.company, proposal, bid_data)
        return JsonResponse({'success': proposal.proposal_uuid})
    else:
        errors = dict([(key, [str(error) for error in value]) for key, value in bid_form.errors.items()])
        return JsonResponse(errors)


# Updates a bid object in the database belonging to the requesting user.
# Error messages returned if the form is invalid or the user/bid doesn't exist.
@csrf_exempt
def updateBid(request):
    bid_data = JSONParser().parse(BytesIO(request.body))
    bid_form = BidForm(bid_data)

    if bid_form.is_valid():
        proposal_uuid = bid_data['proposal_uuid']
        session_token = bid_data['session_token']

        # Validate proposal object & user object exist
        try:
            bid = Bid.objects.get(corresponding_proposal__proposal_uuid = proposal_uuid)
            user = ManagrUser.objects.get(session_token = session_token)
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'Invalid request.'})

        if bid.owner == user.company:
            bid = Bid.objects.update_bid(bid, bid_data)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'error': 'Invalid request.'})
    else:
        errors = dict([(key, [str(error) for error in value]) for key, value in bid_form.errors.items()])
        return JsonResponse(errors)


# Removes a bid object from the database. Ensures the requesting using owns the bid
# object before deleting it.
@csrf_exempt
def deleteBid(request):
    request_data = JSONParser().parse(BytesIO(request.body))

    proposal_uuid = request_data['proposal_uuid']
    session_token = request_data['session_token']

    if session_token and proposal_uuid:
        # Validate bid object & user object exist
        try:
            bid = Bid.objects.get(corresponding_proposal__proposal_uuid = proposal_uuid)
            user = ManagrUser.objects.get(session_token = session_token)
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'Invalid request.'})
        
        # Check owner
        if bid.owner == user.company:
            bid.delete()
            return JsonResponse({'success': True })
    
    return JsonResponse({'error': 'Invalid request.'})


# Returns an ordered dictionary of bids with their corresponding proposal titles as keys and the
# proposal_uuids as values. The proposal_uuids are used to link the front end to a specific proposal.
# Note: returns bids belonging only to the requesting user
@csrf_exempt
def getUserBidMetadata(request):
    session_token = JSONParser().parse(BytesIO(request.body))

    if session_token:
        # Validate user exists
        try:
            user = ManagrUser.objects.get(session_token = session_token)
        except ManagrUser.DoesNotExist:
            return JsonResponse({'error': 'Invalid request.'})

        # Generate a list of project proposals and their ids
        bids = Bid.objects.filter(owner = user.company).order_by('corresponding_proposal__title')

        bid_metadata = OrderedDict()

        for bid in bids:
            metadata = {
                'proposal_uuid': bid.corresponding_proposal.proposal_uuid,
                'flagged': bid.bid_declined or bid.proposal_removed
            }
            bid_metadata[bid.corresponding_proposal.title] = metadata

        return JsonResponse({
            'success': 'Proposals returned for user.',
            'data': bid_metadata
        })

    return JsonResponse({'error': 'Invalid request.'})


# Returns all bids associated with a project proposal. Checks that the requesting user
# owns the proposal before returning bids associated with it.
@csrf_exempt
def loadBidsOnProposal(request):
    request_data = JSONParser().parse(BytesIO(request.body))

    proposal_uuid = request_data['proposal_uuid']
    session_token = request_data['session_token']

    if session_token and proposal_uuid:
        # Validate user and proposal exist
        try:
            user = ManagrUser.objects.get(session_token = session_token)
            proposal = Proposal.objects.get(proposal_uuid = proposal_uuid)
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'Invalid request.'})

        # If the proposal owner is the requesting body, return the list of bids
        if proposal.owner == user.company:
            bids = Bid.objects.filter(corresponding_proposal__proposal_uuid = proposal_uuid).exclude(bid_declined = True)
            bidsList = list()

            for bid in bids:
                bidsList.append({
                    'budget': bid.budget,
                    'start_date': bid.start_date.strftime("%B %d, %Y"),
                    'end_date': bid.end_date.strftime("%B %d, %Y"),
                    'contact_number': prettyFormatContact(bid.contact_number),
                    'description': bid.details['description'],
                    'bid_uuid': bid.bid_uuid,
                })
            return JsonResponse({
                'success': True,
                'data': bidsList,
            })
    
    return JsonResponse({'error': 'Invalid request.'})


# Accepts a bid given exisiting proposal/bid objects. Ensure the requesting body owns the proposal
# and that the bid to be accepted corresponds with the given proposal before creating the project
# object, inactivating the proposal object, and deleting the bid object.
@csrf_exempt
def acceptBid(request):
    request_data = JSONParser().parse(BytesIO(request.body))

    session_token = request_data['session_token']
    proposal_uuid = request_data['proposal_uuid']
    bid_uuid = request_data['bid_uuid']

    if session_token and proposal_uuid and bid_uuid:
        # Validate user, proposal, and bid exist
        try:
            user = ManagrUser.objects.get(session_token = session_token)
            proposal = Proposal.objects.get(proposal_uuid = proposal_uuid)
            bid = Bid.objects.get(bid_uuid = bid_uuid)
            bidUser = bid.owner.owner_or_creator
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'Invalid request.'})

        # Ensure bid/proposal correspond and requesting entitiy is the proposal owner
        if bid.corresponding_proposal == proposal and proposal.owner == user.company:
            print("This is a valid bid acceptance request.")
            project_data = {
                'create_project_name': proposal.title,
                'create_project_budget': int(bid.budget),
                'create_project_description': proposal.details['description'],
                'client_contact_number': prettyFormatContact(proposal.contact_number),
                'contractor_contact_number': prettyFormatContact(bid.contact_number),
                'client_company': str(user.company.company_uuid),
                'session_token': str(session_token),
            }
            new_project = Project.objects.create_new_project(project_data, bid.owner.owner_or_creator)
            user.projects.add(new_project)
            user.save()
            bidUser.projects.add(new_project)
            bidUser.save()
            Bid.objects.deactivate_proposal(proposal)
            Proposal.objects.deactivate(proposal)

            return JsonResponse({'success': 'Successful project creation', 'new_project_uuid': str(new_project.project_uuid)})
    return JsonResponse({'error': 'Invalid request.'})


# Declines a bid given existing proposal/bid objects. Ensures the requesting body owns the proposal
# and that the bid to be declined corresponds with the given proposal before flagging the bid.
@csrf_exempt
def declineBid(request):
    request_data = JSONParser().parse(BytesIO(request.body))

    session_token = request_data['session_token']
    proposal_uuid = request_data['proposal_uuid']
    bid_uuid = request_data['bid_uuid']

    if session_token and proposal_uuid and bid_uuid:
        # Validate user, proposal, and bid exist
        try:
            proposal = Proposal.objects.get(proposal_uuid = proposal_uuid)
            bid = Bid.objects.get(bid_uuid = bid_uuid)
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'Invalid request.'})

        # Ensure bid/proposal correspond
        if bid.corresponding_proposal == proposal:
            Bid.objects.decline_bid(bid)

            return JsonResponse({'success': True})

    return JsonResponse({'error': 'Invalid request.'})
