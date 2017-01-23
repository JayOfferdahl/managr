from django.contrib.postgres.fields import HStoreField
from django.db import models

from managr_entities.app_models.company import Company
from project_proposal.app_models.proposal import Proposal

class Bid(models.Model):
	corresponding_proposal = models.ForeignKey(Proposal, on_delete = models.CASCADE)
	owner = models.ForeignKey(Company, on_delete = models.CASCADE)

	DETAILS_ATTRIBUTE_FIELDS = [ # List of keys accepted in 'details' hstore
		# TODO - determine some details
	]
	details = HStoreField()
