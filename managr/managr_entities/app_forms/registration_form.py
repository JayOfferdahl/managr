from django import forms
from django.core.exceptions import ValidationError
from django.forms import ModelForm

from managr_entities.app_models.managr_user import ManagrUser

class RegistrationForm(ModelForm):
	password_confirmation = forms.CharField(max_length = 128, error_messages={'required': 'Password confirmation is required', 'max_length': 'The password confirmation given is too long'})

	class Meta:
		model = ManagrUser
		fields = ['first_name', 'last_name', 'username', 'email', 'password']

		error_messages = {
            'username': {
                'required': ("Username is required"),
                'max_length': ("The username given is too long"),
            },
            'email': {
            	'invalid': ("Invalid email address"),
            	'max_length': ("The email given is too long"),
            },
            'password': {
            	'required': ("Password is required"),
            	'max_length': ("The password given is too long"),
            }
        }

	def clean_username(self):
		username = self.cleaned_data['username']
		if ManagrUser.objects.filter(username = username).exists():
			raise ValidationError("An account with this username already exists")
		return username

	def clean_email(self):
		email = self.cleaned_data['email']
		if ManagrUser.objects.filter(email = email).exists():
			raise ValidationError("An account with this email already exists")
		if not email:
			raise ValidationError("Email is required")
		return email

	def clean_first_name(self):
		first_name = self.cleaned_data['first_name']
		if not first_name:
			raise ValidationError("First name is required")
		return first_name

	def clean_last_name(self):
		last_name = self.cleaned_data['last_name']
		if not last_name:
			raise ValidationError("Last name is required")
		return last_name

	def clean(self):
		cleaned_data = super(RegistrationForm, self).clean()
		password = cleaned_data.get('password')
		password_confirmation = cleaned_data.get('password_confirmation')

		if password != password_confirmation:
			self.add_error('password_confirmation', "Passwords do not match")

		return cleaned_data
