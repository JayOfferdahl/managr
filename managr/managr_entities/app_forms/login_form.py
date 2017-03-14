import re

from django import forms
from django.core.exceptions import ValidationError

from managr_entities.app_models.managr_user import ManagrUser

class LoginForm(forms.Form):
	username_or_email = forms.CharField(max_length = 254, error_messages={'required': 'No username/email given', 'max_length': 'The username/email given is too long'})
	password = forms.CharField(max_length = 128, error_messages={'required': 'No password given', 'max_length': 'The password given is too long'})
	email_as_username = False # Defaults to false, set true if it is found that an email was given for username

	def clean_username_or_email(self):
		username_or_email = self.cleaned_data['username_or_email']
		if re.match(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)", username_or_email):
			self.email_as_username = True
			if not ManagrUser.objects.filter(email = username_or_email).exists():
				raise ValidationError("No account matches the given username/email & password")
		elif username_or_email and not ManagrUser.objects.filter(username = username_or_email).exists():
			raise ValidationError("No account matches the given username/email & password")

		return username_or_email
		
