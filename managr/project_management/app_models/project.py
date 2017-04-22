import uuid

from django.db import models

from managr_entities.app_models.company import Company
from project_management.app_managers.project import ProjectManager

class Project(models.Model):
    company_owner = models.ForeignKey(Company, on_delete = models.PROTECT, related_name = 'company_owner', null = True)
    client = models.ForeignKey(Company, on_delete = models.SET_NULL, related_name = 'client', null = True)
    user_owner = models.ForeignKey('managr_entities.ManagrUser', on_delete = models.SET_NULL, null = True)
    name = models.CharField(max_length = 255)
    project_uuid = models.UUIDField(default = uuid.uuid4, editable = False)
    budget = models.IntegerField(null = True)
    description = models.TextField(blank = True)

    objects = ProjectManager()
