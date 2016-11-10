from django.db import models
from django.contrib.auth.models import AbstractUser

class ManagrUser(AbstractUser):
	USER_TYPE_CHOICES = (
		(0, 'Construction Management'),
		(1, 'Client'),
		(2, 'Construction Worker'),
	)
	user_type = models.IntegerField(choices = USER_TYPE_CHOICES, default = 0)
