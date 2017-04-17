import re
from datetime import date

from django import forms
from django.core.exceptions import ValidationError
from django.forms import ModelForm

from project_proposal.app_models.bid import Bid

class BidForm(ModelForm):
    class Meta:
        model = Bid
        fields = ['contact_number', 'budget', 'start_date', 'end_date']

        error_messages = {
            'contact_number': {
                'required': 'No contact_number given',
                'max_length': 'The number is too long, please use the form \"(xxx) xxx-xxxx\"'
            },
            'budget': {
                'required': 'No budget given',
                'max_digits': 'The budget it too big, please limit to 10 digits'
            },
            'start_date': {
                'required': 'No start date given',
            },
            'end_date': {
                'required': 'No end date given',
            }
        }

    # Validating the contact number requires a 10 digit number which is then formatted for consistency
    def clean_contact_number(self):
        contact_number = self.cleaned_data['contact_number']
        
        # Count number of digits in the input (10 digit numbers accepted - not internationalized yet)
        # Formats allowed: (xxx) xxx-xxxx
        digits = sum(c.isdigit() for c in contact_number)

        if digits != 10:
            raise ValidationError("Invalid contact number format: 10 digit number expected")
        
        # Format the number to store as a 14 character string (xxx) xxx-xxxx
        formatted_contact_number = "("
        i = 0

        for c in contact_number:
            if c.isdigit():
                formatted_contact_number += c
                i += 1
                if i == 3:
                    formatted_contact_number += ") "
                elif i == 6:
                    formatted_contact_number += "-"

        return formatted_contact_number

    def clean_budget(self):
        budget = self.cleaned_data['budget']

        # Verify that the budget is a positive number
        if budget <= 0:
            raise ValidationError("Budget must be greater than $0.")
        return budget

    def clean_start_date(self):
        start_date = self.cleaned_data['start_date']
        today = date.today()

        # Verify the start date is on or after the current day
        if start_date < today:
            raise ValidationError("A project cannot start before today")
        return start_date

    def clean(self):
        cleaned_data = super(BidForm, self).clean()

        # Verify start date comes before end date
        start_date = cleaned_data.get('start_date')
        end_date = cleaned_data.get('end_date')

        if start_date and end_date and start_date > end_date:
            self.add_error('start_date', "Start date cannot be after the end date")

        return cleaned_data        
