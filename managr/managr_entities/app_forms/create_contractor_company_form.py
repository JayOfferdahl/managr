import re

from django import forms
from django.core.exceptions import ValidationError

from managr_entities.app_models.company import Company

class CreateContractorCompanyForm(forms.Form):
    company_name = forms.CharField(max_length = 128, error_messages={'required': 'Company name is required', 'max_length': 'The company name given is too long'})
    company_email = forms.CharField(max_length = 128, error_messages={'required': 'Company email is required', 'max_length': 'The company email given is too long'})
    address = forms.CharField(max_length = 128, error_messages={'required': 'Address is required', 'max_length': 'The address given is too long'})
    city = forms.CharField(max_length = 128, error_messages={'required': 'City is required', 'max_length': 'The city given is too long'})
    state = forms.IntegerField(min_value = 0, max_value = 51, error_messages={'required': 'State is required'})
    postal_code = forms.CharField(error_messages={'required': 'Postal code is required'})
    description = forms.CharField(error_messages={'required': 'Company description is required'})

    def clean_company_email(self):
        company_email = self.cleaned_data['company_email']
        if not re.match(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)", company_email):
            raise ValidationError("Invalid email address")

        return company_email

    def clean_postal_code(self):
        postal_code = self.cleaned_data['postal_code']
        if not re.match(r'^[0-9]{5}$', postal_code):
            raise ValidationError("The postal code given is invalid")

        return postal_code
