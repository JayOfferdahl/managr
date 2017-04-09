from django.db import models

from managr_entities.app_models.managr_user import ManagrUser

class ProposalManager(models.Manager):
    def create_proposal(self, proposal_data):
        print("inside the manager")
        # THIS IS VERY BAD: TODO -> Get current user and bind the proposal to them
        user = ManagrUser.objects.all()[0]
        print(user)

        proposal = self.create(
            owner = user,
            title = proposal_data['title'],
            address = proposal_data['address'],
            contact_number = proposal_data['contact_number'],
            start_date = proposal_data['start_date'],
            end_date = proposal_data['end_date'],
            budget = proposal_data['budget'],
            details = {'description': proposal_data['description']}
        )
        print(proposal)

        proposal.save()
        return proposal
