from django import forms
from django.forms import ModelForm

from managr_entities.app_models.managr_user import ManagrUser

class RegistrationForm(ModelForm):
	password_confirmation = forms.CharField(max_length = 30)

	class Meta:
		model = ManagrUser
		fields = ['first_name', 'last_name', 'email', 'password']

	
