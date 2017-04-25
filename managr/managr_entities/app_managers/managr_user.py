from Crypto import Random
import uuid

from django.contrib.auth.models import UserManager

class ManagrUserManager(UserManager):
	def create_user(self, username, email, password, **extra_fields):
		if not email:
			raise ValueError("Managr user must have an associated email")

		return super(ManagrUserManager, self).create_user(username, email, password, **extra_fields)

	def create_superuser(self, username, email, password, **extra_fields):
		if not email:
			raise ValueError("Managr user must have an associated email")

		return super(ManagrUserManager, self).create_superuser(username, email, password, **extra_fields)

	def register_user(self, new_user_data):
		managr_user = super(ManagrUserManager, self).create_user(new_user_data['username'],new_user_data['email'], new_user_data['password'], shifts = {}, first_name = new_user_data['first_name'], last_name = new_user_data['last_name'], user_type = int(new_user_data['user_type']))
		managr_user.session_token = uuid.UUID(bytes = Random.get_random_bytes(16))
		managr_user.save()
		return managr_user

	def generate_new_session_token(self):
		return uuid.UUID(bytes = Random.get_random_bytes(16))

