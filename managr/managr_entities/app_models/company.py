import uuid

from django.contrib.postgres.fields import HStoreField
from django.db import models

class Company(models.Model):
	name = models.CharField(max_length = 255)
	company_uuid = models.UUIDField(default = uuid.uuid4, editable = False)

	COMPANY_TYPE_CHOICES = (
		(0, 'Construction'),
		(1, 'Client'),
	)
	company_type = models.IntegerField(choices = COMPANY_TYPE_CHOICES, default = 0)

	COMPANY_ATTRIBUTE_FIELDS = [ # List of keys accepted in 'attributes' hstore
		'Location',
		'Description',
		'Email Address',
	]
	attributes = HStoreField()
