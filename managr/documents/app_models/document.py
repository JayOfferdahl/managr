import uuid

from django.db import models
from managr_entities.app_models.company import Company
from managr_entities.app_models.managr_user import ManagrUser
from project_management.app_models.project import Project

class Document(models.Model):
	title = models.CharField(max_length = 255)
	company = models.ForeignKey(Company, on_delete = models.SET_NULL, null = True)
	company_name = models.CharField(max_length = 255)
	project = models.ForeignKey(Project, on_delete = models.SET_NULL, null = True)
	project_name = models.CharField(max_length = 255)
	creator = models.ForeignKey(ManagrUser, on_delete = models.SET_NULL, related_name = 'creator', null = True)
	creator_name = models.CharField(max_length = 255)
	editors = models.ManyToManyField(ManagrUser, related_name = 'editors')
	viewers = models.ManyToManyField(ManagrUser, related_name = 'viewers')
	edit_link = models.URLField(max_length = 500, null = True)
	view_link = models.URLField(max_length = 500, null = True)
	uploaded_file = models.FileField(upload_to = 'documents/', null = True)
