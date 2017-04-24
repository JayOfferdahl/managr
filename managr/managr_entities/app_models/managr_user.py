import uuid

from django.db import models
from django.contrib.postgres.fields import HStoreField
from django.contrib.auth.models import AbstractUser

from managr_entities.app_models.company import Company 
from managr_entities.app_managers.managr_user import ManagrUserManager
from project_management.app_models.project import Project

from helpers.hstore_helper import *

class ManagrUser(AbstractUser):
	user_uuid = models.UUIDField(default = uuid.uuid4, editable = False)
	company = models.ForeignKey(Company, on_delete = models.SET_NULL, null = True)
	projects = models.ManyToManyField(Project)

	USER_TYPE_CHOICES = (
		(0, 'Construction Management'),
		(1, 'Client'),
		(2, 'Construction Worker'),
	)
	user_type = models.IntegerField(choices = USER_TYPE_CHOICES, default = 0)
	session_token = models.UUIDField(null = True, editable = True)

	is_clocked_in = models.BooleanField(default = False)
	shifts = HStoreField()

	objects = ManagrUserManager()
