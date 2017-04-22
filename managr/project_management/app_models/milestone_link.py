from django.db import models
from project_management.app_models.project import Project

# A link is a connection between tasks which shows how the tasks are related
# Included datatypes are specified here:
# https://docs.dhtmlx.com/gantt/desktop__loading.html#specifyingdataproperties
class MilestoneLink(models.Model):
    project = models.ForeignKey('Project', on_delete = models.CASCADE)

    # Required properties of a task object ########################################################

    # (number) ids of a task that the dependency will start from
    source = models.BigIntegerField()
    # (number) ids of a task that the dependency will end with
    target = models.BigIntegerField()

    # (string) the dependency type
    LINK_TYPES = (
        (0, 'finish to start'),
        (1, 'start to start'),
        (2, 'finish to finish'),
        (3, 'start to finish'),
    )
    task_type = models.CharField(max_length = 1, choices = LINK_TYPES, default = "0")