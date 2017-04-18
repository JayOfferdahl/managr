from django.db import models

class CompanyManager(models.Manager):
    def create_contractor_company(self, owner_or_creator, name, email, address, city, state, postal_code, description): 
        attributes_dict = {'email_address': email, 'address': address, 'city': city, 'state': state, 'postal_code': postal_code, 'description': description}
        return self.create(owner_or_creator = owner_or_creator, name = name, company_type = 0, attributes = attributes_dict) 

    def create_client_company(self, owner_or_creator, name, email, address, city, state, postal_code, description):
        attributes_dict = {'email_address': email, 'address': address, 'city': city, 'state': state, 'postal_code': postal_code, 'description': description}
        return self.create(owner_or_creator = owner_or_creator, name = name, company_type = 1, attributes = attributes_dict) 
