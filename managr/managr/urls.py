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
from project_management import views as project_management_views
from project_proposal import views as project_proposal_views

urlpatterns = [
    # Organize these url patterns by which views they belong to
    url(r'^admin/', admin.site.urls),

    # Begin managr_entities_views
    url(r'^accounts/login', managr_entities_views.login, name='login'),
    url(r'^accounts/logout', managr_entities_views.logout, name='logout'),
    url(r'^accounts/signup', managr_entities_views.register, name='register'),
    url(r'^accounts/ensure-auth', managr_entities_views.ensureAuth, name='ensure_auth'),
    # End managr_entities_views

    # Begin project_proposal_views
    url(r'^proposals/accept-bid', project_proposal_views.acceptBid, name='accept_bid'),
    url(r'^proposals/decline-bid', project_proposal_views.declineBid, name='decline_bid'),
    url(r'^proposals/delete', project_proposal_views.deleteProposal, name='delete_proposal'),
    url(r'^proposals/get-metadata', project_proposal_views.getUserProposalMetadata, name='get_user_proposal_metadata'),
    url(r'^proposals/load-bids', project_proposal_views.loadBidsOnProposal, name='load_bids_on_proposal'),
    url(r'^proposals/new', project_proposal_views.newProposal, name='new_proposal'),
    url(r'^proposals/proposal', project_proposal_views.getProposal, name='proposal'),
    url(r'^proposals/update', project_proposal_views.updateProposal, name='update_proposal'),

    url(r'^bids/delete', project_proposal_views.deleteBid, name='delete_bid'),
    url(r'^bids/get-metadata', project_proposal_views.getUserBidMetadata, name='get_user_bid_metadata'),
    url(r'^bids/new', project_proposal_views.newBid, name='new_bid'),
    url(r'^bids/show-proposals', project_proposal_views.showProposals, name='show_proposals'),
    url(r'^bids/update', project_proposal_views.updateBid, name='update_bid'),
    # End project_proposal_views

    # Begin project_management_views
    url(r'^milestones/get$', project_management_views.getMilestones, name='get_milestones'),
    url(r'^milestones/update$', project_management_views.updateMilestones, name='update_milestones'),
    # End project_management_views
]
