import re

from django import forms
from django.contrib.postgres.forms import HStoreField
from django.core.exceptions import ValidationError
from django.forms import ModelForm

from project_proposal.app_models.proposal import Proposal

class ProposalForm(ModelForm):
    class Meta:
        model = Proposal
        fields = ['title', 'contact_number', 'address', 'budget', 'start_date', 'end_date', 'details']

        error_messages = {
            'title': {
                'required': 'No title given',
                'max_length': 'The title is too long (max 255 characters)'
            },
            'contact_number': {
                'required': 'No address given',
                'max_length': 'The address is too long (max 255 characters)'
            },
            'address': {
                'required': 'No contact number given',
                'max_length': 'The number is too long, please use the form \"(xxx) xxx-xxxx\"'
            },
            'budget': {
                'required': 'No budget given',
                'max_digits': 'The budget it too big, please limit to 10 digits'
            }
        }

    def clean_title(self):
        title = self.cleaned_data['title']
        if not title:
            raise ValidationError("Project title required")
        return title

    def clean_contact_number(self):
        contact_number = self.cleaned_data['contact_number']
        if not contact_number:
            raise ValidationError("Contact number required")
        return contact_number

    def clean_address(self):
        address = self.cleaned_data['address']
        if not address:
            raise ValidationError("Location/address required")
        return address

    def clean_budget(self):
        budget = self.cleaned_data['budget']
        # TODO make sure budget is greater than 0
        if not budget:
            raise ValidationError("Budget required")
        return budget

    def clean_start_date(self):
        start_date = self.cleaned_data['start_date']
        if not start_date:
            raise ValidationError("Start date required")
        return start_date

    def clean_end_date(self):
        end_date = self.cleaned_data['end_date']
        if not end_date:
            raise ValidationError("End date required")
        return end_date

    def clean_details(self):
        details = self.cleaned_data['description']
        if not details:
            raise ValidationError("Description required")
        return details

    def clean(self):
        cleaned_data = super(ProposalForm, self).clean()
        start_date = cleaned_data.get('start_date')
        end_date = cleaned_data.get('end_date')

        if start_date > end_date:
            self.add_error('start_date', "Start date cannot be after the end date")

        return cleaned_data        
