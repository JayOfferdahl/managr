from django.db import models

class BidManager(models.Manager):
    def create_bid(self, user, proposal, bid_data):
        print("Creating bid object (Debug statement - project_proposal/app_managers/bid.py)")

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
