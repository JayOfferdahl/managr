from django.contrib.postgres.fields import HStoreField
from django.core.exceptions import ValidationError
from django.db import models

from helpers.hstore_helper import *
from managr_entities.app_models.company import Company
from project_proposal.app_models.proposal import Proposal

class Bid(models.Model):
	corresponding_proposal = models.ForeignKey(Proposal, on_delete = models.CASCADE)
	owner = models.ForeignKey(Company, on_delete = models.CASCADE)

	DETAILS_FIELDS = [ # List of keys accepted in 'details' hstore
		# TODO - determine some details
	]
	details = HStoreField()

	def clean(self, *args, **kwargs):
		has_valid_details = verify_keys_before_save(self.attributes, self.DETAILS_FIELDS)
		if has_valid_details == True:
			super(Bid, self).clean(*args, **kwargs)
		else:
			raise ValidationError('Invalid bid detail(s): (' + has_valid_details +')')
