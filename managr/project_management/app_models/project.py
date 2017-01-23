from django.db import models

from managr_entities.app_models.company import Company

class Project(models.Model):
	owner = models.ForeignKey(Company, on_delete = models.PROTECT, related_name = 'owner', null = True)
	client = models.ForeignKey(Company, on_delete = models.SET_NULL, related_name = 'client', null = True)
	name = models.CharField(max_length = 255)
	description = models.TextField(blank = True)
