import uuid

from Crypto import Random
from django.db import models
from managr_entities.app_models.managr_user import ManagrUser

class ProposalManager(models.Manager):
    def create_proposal(self, user, proposal_data):
        print("Creating proposal object (Debug statement - project_proposal/app_managers/proposal.py)")

        proposal = self.create(
            owner = user,
            title = proposal_data['title'],
            address = proposal_data['address'],
            contact_number = proposal_data['contact_number'],
            start_date = proposal_data['start_date'],
            end_date = proposal_data['end_date'],
            budget = proposal_data['budget'],
            details = {'description': proposal_data['description']},
            proposal_uuid = self.generate_project_uuid(),
        )

        proposal.save()
        return proposal

    def generate_project_uuid(self):
        return uuid.UUID(bytes = Random.get_random_bytes(16))
