import os
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
	uploaded_file = models.FileField(upload_to = 'documents/temp_uploaded_documents/', null = True)

	def save(self, *args, **kwargs):
		super(Document, self).save(*args, **kwargs) # Save to server first
		old_full_path = self.uploaded_file.name
		file_path_without_file_name = 'documents/companies_directory/' + self.company_name + '/' + self.project_name
		if not os.path.exists(file_path_without_file_name):
			os.makedirs(file_path_without_file_name)

		file_name = old_full_path[old_full_path.rfind('/') + 1 : len(old_full_path)]
		new_full_path = file_path_without_file_name + '/' + file_name
		os.rename(old_full_path, file_path_without_file_name + '/' + file_name)
		self.uploaded_file.name = new_full_path
		super(Document, self).save(*args, **kwargs) # Save updated file location on server
