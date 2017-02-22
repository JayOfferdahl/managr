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
		managr_user = self.model(first_name = new_user_data['first_name'], last_name = new_user_data['last_name'], username = new_user_data['username'], email = new_user_data['email'])
		managr_user.set_password(new_user_data['password'])
		managr_user.save()
		return managr_user
