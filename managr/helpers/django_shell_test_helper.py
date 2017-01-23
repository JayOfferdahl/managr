# Add all models from all applications into this import helper
# You can then open up a shell ('python3 manage.py shell') and use 
# from helpers.django_shell_test_helper import *  and have access to all models for testing purposes

# Import from managr_entities application
from managr_entities.app_models.managr_user import ManagrUser
from managr_entities.app_models.company import Company

# Import from documents application
from documents.app_models.document import Document

# Import from project_management application
from project_management.app_models.project import Project

# Import from project_proposal application
from project_proposal.app_models.bid import Bid
from project_proposal.app_models.proposal import Proposal
