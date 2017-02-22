from django import forms
from django.core.exceptions import ValidationError
from django.forms import ModelForm

from managr_entities.app_models.managr_user import ManagrUser

class RegistrationForm(ModelForm):
	password_confirmation = forms.CharField(max_length = 30)

	class Meta:
		model = ManagrUser
		fields = ['first_name', 'last_name', 'username', 'email', 'password']


	def clean_email(self):
		email = self.cleaned_data['email']
		if ManagrUser.objects.filter(email = email).exists():
			raise ValidationError("An account with this email already exists")
		return email

	def clean(self):
		cleaned_data = super(RegistrationForm, self).clean()
		password = cleaned_data.get('password')
		password_confirmation = cleaned_data.get('password_confirmation')

		if password != password_confirmation:
			self.add_error('password_confirmation', "Passwords do not match")

		return cleaned_data
