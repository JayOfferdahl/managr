from django.contrib.postgres.fields import HStoreField
from django.db import models

from managr_entities.app_models.company import Company

class Proposal(models.Model):
	owner = models.ForeignKey(Company, on_delete = models.CASCADE)
	title = models.CharField(max_length = 255)

	DETAILS_ATTRIBUTE_FIELDS = [ # List of keys accepted in 'details' hstore
		'Description',
	]
	details = HStoreField()
