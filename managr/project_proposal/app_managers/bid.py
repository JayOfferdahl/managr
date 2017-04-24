import uuid

from Crypto import Random
from django.db import models

class BidManager(models.Manager):
    def create_bid(self, company, proposal, bid_data):
        bid = self.create(
            corresponding_proposal = proposal,
            owner = company,
            contact_number = bid_data['contact_number'],
            start_date = bid_data['start_date'],
            end_date = bid_data['end_date'],
            budget = bid_data['budget'],
            details = {'description': bid_data['description']},
            bid_uuid = self.generate_bid_uuid(),
        )

        bid.save()
        return bid

    def update_bid(self, bid, bid_data):
        # TODO: Only update fields that changed --> not too big of a deal here since the data
        # structure is so small, but this is bad practice to write over fields that didn't change.
        bid.contact_number = bid_data['contact_number']
        bid.start_date = bid_data['start_date']
        bid.end_date = bid_data['end_date']
        bid.budget = bid_data['budget']
        bid.details = {'description': bid_data['description']}
        bid.bid_declined = False

        bid.save()
        return bid

    def generate_bid_uuid(self):
        return uuid.UUID(bytes = Random.get_random_bytes(16))

    def decline_bid(self, bid):
        bid.bid_declined = True
        bid.save()

    def deactivate_proposal(self, proposal):
        # Get all bids associated with this proposal
        bids = self.filter(corresponding_proposal = proposal)

        for bid in bids:
            bid.proposal_removed = True
            bid.save()
