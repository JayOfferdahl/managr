# Add all models and managers from all applications into this import helper
# You can then open up a shell ('python3 manage.py shell') and use 
# from helpers.django_shell_test_helper import *  and have access to all models for testing purposes

# Import from managr_entities application
from managr_entities.app_models.managr_user import ManagrUser
from managr_entities.app_managers.managr_user import ManagrUserManager
from managr_entities.app_models.company import Company
from managr_entities.app_managers.company import CompanyManager

# Import from documents application
from documents.app_models.document import Document
from documents.app_managers.document import DocumentManager

# Import from project_management application
from project_management.app_models.project import Project
from project_management.app_managers.project import ProjectManager
from project_management.app_models.milestone import Milestone
from project_management.app_managers.milestone import MilestoneManager
from project_management.app_models.milestone_link import MilestoneLink
from project_management.app_managers.milestone_link import MilestoneLinkManager

# Import from project_proposal application
from project_proposal.app_models.bid import Bid
from project_proposal.app_managers.bid import BidManager
from project_proposal.app_models.proposal import Proposal
from project_proposal.app_managers.proposal import ProposalManager
