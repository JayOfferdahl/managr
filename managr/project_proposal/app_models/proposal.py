from django.contrib.postgres.fields import HStoreField
from django.core.exceptions import ValidationError
from django.db import models

from helpers.hstore_helper import *
from managr_entities.app_models.company import Company

class Proposal(models.Model):
	owner = models.ForeignKey(Company, on_delete = models.CASCADE)
	title = models.CharField(max_length = 255)
	contact_number = models.CharField(max_length = 10)
	start_date = models.DateField()
	end_date = models.DateField()
	budget = models.DecimalField(max_digits = 12, decimal_places = 2)
	DETAILS_FIELDS = [ # List of keys accepted in 'details' hstore
		'Description',
	]
	details = HStoreField()

	def clean(self, *args, **kwargs):
		has_valid_details = verify_keys_before_save(self.attributes, self.DETAILS_FIELDS)
		if has_valid_details == True:
			super(Proposal, self).clean(*args, **kwargs)
		else:
			raise ValidationError('Invalid proposal detail(s): (' + has_valid_details +')')
