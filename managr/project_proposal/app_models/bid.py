from django.contrib.postgres.fields import HStoreField
from django.core.exceptions import ValidationError
from django.db import models

from helpers.hstore_helper import *
# from managr_entities.app_models.company import Company
from managr_entities.app_models.managr_user import ManagrUser
from project_proposal.app_models.proposal import Proposal
from project_proposal.app_managers.bid import BidManager

import uuid

class Bid(models.Model):
    corresponding_proposal = models.ForeignKey(Proposal, on_delete = models.CASCADE)
    owner = models.ForeignKey(ManagrUser, on_delete = models.CASCADE)
    contact_number = models.CharField(max_length = 14)
    start_date = models.DateField()
    end_date = models.DateField()
    budget = models.DecimalField(max_digits = 10, decimal_places = 0)
    DETAILS_FIELDS = [ # List of keys accepted in 'details' hstore
        'description'
    ]
    details = HStoreField()
    bid_declined = models.BooleanField(default = False)
    proposal_removed = models.BooleanField(default = False)
    bid_uuid = models.UUIDField(default = uuid.uuid4, editable = False)

    def clean(self, *args, **kwargs):
        if self.details != None:
            has_valid_details = verify_keys_before_save(self.attributes, self.DETAILS_FIELDS)
            if has_valid_details == True:
                super(Bid, self).clean(*args, **kwargs)
            else:
                raise ValidationError('Invalid bid detail(s): (' + has_valid_details +')')

    objects = BidManager()
