from django.db import models

from managr_entities.app_models.company import Company

class ProjectManager(models.Manager):
    def create_new_project(self, project_data, creator_user):
        client_company = None
        if 'client_company' in project_data:
            client_company = Company.objects.get(company_uuid = project_data['client_company'])

        return self.create(company_owner = creator_user.company, client = client_company, user_owner = creator_user, name = project_data['create_project_name'], budget = project_data['create_project_budget'], description = project_data['create_project_description'])
