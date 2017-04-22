"""managr URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include
from django.conf.urls import url
from django.contrib import admin
from django.views.generic import TemplateView

from . import views as managr_views
from managr_entities import views as managr_entities_views
from project_proposal import views as project_proposal_views
from project_management import views as project_management_views

urlpatterns = [
    # Organize these url patterns by which views they belong to
    url(r'^admin/', admin.site.urls),

    # Begin managr_entities_views
    url(r'^accounts/login', managr_entities_views.login, name='login'),
    url(r'^accounts/logout', managr_entities_views.logout, name='logout'),
    url(r'^accounts/signup', managr_entities_views.register, name='register'),
    url(r'^accounts/ensure-auth', managr_entities_views.ensureAuth, name='ensure_auth'),

    url(r'^proposals/get-user-proposal-metadata', project_proposal_views.getUserProposalMetadata, name="get_user_proposal_metadata"),
    url(r'^companies/create-contractor-company', managr_entities_views.createContractorCompany, name='create_contractor_company'),
    url(r'^companies/create-client-company', managr_entities_views.createClientCompany, name='create_client_company'),
    url(r'^companies/join-company', managr_entities_views.joinCompany, name='join_company'),

    url(r'^proposals/new', project_proposal_views.newProposal, name='new_proposal'),
    url(r'^proposals/proposal', project_proposal_views.getProposal, name='proposal'),
    url(r'^proposals/update', project_proposal_views.updateProposal, name='update_proposal'),

    url(r'^bids/showproposals', project_proposal_views.showProposals, name='show_proposals'),

    url(r'^projects/get-user-project-metadata', project_management_views.getUserProjectMetadata, name='get_user_project_metadata'),
    url(r'^projects/create-new-project', project_management_views.createNewProject, name='create_new_project'),
    url(r'^projects/get-project-info', project_management_views.getProjectInfo, name='get_project_info'),
]
