import uuid

from django.db import models

from helpers.hstore_helper import *
from django.contrib.postgres.fields import HStoreField

from managr_entities.app_models.company import Company
from project_management.app_managers.project import ProjectManager

class Project(models.Model):
    company_owner = models.ForeignKey(Company, on_delete = models.PROTECT, related_name = 'company_owner', null = True)
    client = models.ForeignKey(Company, on_delete = models.SET_NULL, related_name = 'client', null = True)
    user_owner = models.ForeignKey('managr_entities.ManagrUser', on_delete = models.SET_NULL, null = True)
    name = models.CharField(max_length = 255)
    project_uuid = models.UUIDField(default = uuid.uuid4, editable = False)
    budget = models.DecimalField(max_digits = 10, decimal_places = 0)
    description = models.TextField(blank = True)

    client_contact_number = models.CharField(max_length = 14, blank = True)
    contractor_contact_number = models.CharField(max_length = 14, blank = True)

    objects = ProjectManager()
