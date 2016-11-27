from django.contrib.postgres.fields import HStoreField
from django.db import models

class Company(models.Model):
	name = models.CharField(max_length = 255)
	COMPANY_TYPE_CHOICES = (
		(0, 'Construction'),
		(1, 'Client'),
	)
	company_type = models.IntegerField(choices = COMPANY_TYPE_CHOICES, default = 0)
	attributes = HStoreField()
