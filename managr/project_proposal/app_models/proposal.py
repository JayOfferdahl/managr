from django.contrib.postgres.fields import HStoreField
from django.core.exceptions import ValidationError
from django.db import models

from helpers.hstore_helper import *
from managr_entities.app_models.managr_user import ManagrUser
from project_proposal.app_managers.proposal import ProposalManager

class Proposal(models.Model):
	owner = models.ForeignKey(ManagrUser, on_delete = models.CASCADE)
	title = models.CharField(max_length = 255)
	address = models.CharField(max_length = 255)
	contact_number = models.CharField(max_length = 14)
	start_date = models.DateField()
	end_date = models.DateField()
	budget = models.DecimalField(max_digits = 10, decimal_places = 0)
	DETAILS_FIELDS = [ # List of keys accepted in 'details' hstore
		'description',
	]
	details = HStoreField()

	def clean(self, *args, **kwargs):
		has_valid_details = verify_keys_before_save(self.attributes, self.DETAILS_FIELDS)
		if has_valid_details == True:
			super(Proposal, self).clean(*args, **kwargs)
		else:
			raise ValidationError('Invalid proposal detail(s): (' + has_valid_details +')')

	objects = ProposalManager()
