import re

from django import forms
from django.core.exceptions import ValidationError

class CreateProjectForm(forms.Form):
    create_project_name = forms.CharField(max_length = 254, error_messages={'required': 'No project name given', 'max_length': 'The project name is too long'})
    create_project_description = forms.CharField(error_messages={'required': 'No description given'})
