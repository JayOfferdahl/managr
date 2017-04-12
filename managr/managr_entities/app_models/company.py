import uuid

from django.contrib.postgres.fields import HStoreField
from django.core.exceptions import ValidationError
from django.db import models

from managr_entities.app_managers.company import CompanyManager

from helpers.hstore_helper import *

class Company(models.Model):
	name = models.CharField(max_length = 255)
	company_uuid = models.UUIDField(default = uuid.uuid4, editable = False)

	COMPANY_TYPE_CHOICES = (
		(0, 'construction'),
		(1, 'client'),
	)
	company_type = models.IntegerField(choices = COMPANY_TYPE_CHOICES, default = 0)

	COMPANY_ATTRIBUTE_FIELDS = [ # List of keys accepted in 'attributes' hstore
		'address',
		'city',
		'state',
		'postal_code',
		'email_address',
		'description',
	]
	attributes = HStoreField()

	objects = CompanyManager()

	def clean(self, *args, **kwargs):
		has_valid_company_attributes = verify_keys_before_save(self.attributes, self.COMPANY_ATTRIBUTE_FIELDS)
		if has_valid_company_attributes == True:
			super(Company, self).clean(*args, **kwargs)
		else:
			raise ValidationError('Invalid company attribute(s): (' + has_valid_company_attributes +')')
		
