from django.db import models

class BidManager(models.Manager):
    def create_bid(self, user, proposal, bid_data):
        bid = self.create(
            corresponding_proposal = proposal,
            owner = user,
            contact_number = bid_data['contact_number'],
            start_date = bid_data['start_date'],
            end_date = bid_data['end_date'],
            budget = bid_data['budget'],
            details = {'description': bid_data['description']}
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

        bid.save()
        return bid