from django.db import models

class CompanyManager(models.Manager):
    def create_contractor_company(self, name, email, address, city, state, postal_code, description):
        attributes_dict = {'email_address': email, 'address': address, 'city': city, 'state': state, 'postal_code': postal_code, 'description': description}
        return self.create(name = name, company_type = 0, attributes = attributes_dict)
