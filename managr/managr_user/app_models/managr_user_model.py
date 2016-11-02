from django.db import models
from django.contrib.auth.models import AbstractUser

class ManagrUser(AbstractUser):
	user_type = models.CharField(max_length=200)
