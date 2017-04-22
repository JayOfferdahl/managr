import re

from django import forms
from django.core.exceptions import ValidationError

from managr_entities.app_models.company import Company

class JoinCompanyForm(forms.Form):
    company_key = forms.CharField(error_messages={'required': 'No company key given'})

    def clean_company_key(self):
        company_key = self.cleaned_data['company_key']
        if not re.match(r'^[a-zA-Z0-9]{10}$', company_key):
            raise ValidationError("The company key given is invalid")

        corresponding_company = Company.objects.filter(company_key = company_key)
        if not corresponding_company:
            raise ValidationError("The key provided does not match an existing company")

        return company_key
