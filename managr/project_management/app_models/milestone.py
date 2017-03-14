from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from project_management.app_models.project import Project

# A task is an activity on the gantt chart that is displayed as a bar
# Included datatypes are specified here:
# https://docs.dhtmlx.com/gantt/desktop__loading.html#specifyingdataproperties
class Milestone(models.Model):
    project = models.ForeignKey('Project', on_delete = models.CASCADE)

    # Required properties of a task object ########################################################

    # (string) the task text
    text = models.CharField(max_length = 255)
    # (string) the date when a task is scheduled to begin in the format "DD-MM-YYYY"
    start_date = models.CharField(max_length = 10)
    # (number) the task duration
    duration = models.PositiveIntegerField(default = 0)

    ## Note: the task id is taken care of by django

    # Optional properties of a task object ########################################################

    # (string) the task type
    TASK_TYPES = (
        ('task', 'task'),           # a regular task (default)
        ('project', 'project'),     # a task that starts, when its earliest child starts, and ends,
                                    # when its latest child ends. 
                                    ## Note: start_date, end_date, duration ignored if selected.
        ('milestone', 'milestone'), # a zero-duration task that is used to mark out important dates
                                    ## Note: start_date, end_date, duration ignored if selected.
    )
    task_type = models.CharField(max_length = 9, choices = TASK_TYPES, default = 0, blank = True)

    # (string, number) the id of the parent task
    parent_id = models.IntegerField(null = True)

    # Unimplemented optional properties
    # (array) ids of links that comes out from the task
    # source = {TODO: Store as a list, if necessary}
    # (array) ids of links that comes into the tasks
    # target = {TODO: Store as a list, if necessary}

    # (number) the task's level in the tasks hierarchy (zero-based)
    level = models.PositiveIntegerField(null = True)

    # (number from 0 to 1) the task progress
    progress = models.FloatField(
        default = 0, 
        validators = [MaxValueValidator(1.0), MinValueValidator(0.0)],
        blank = True
    )

    # (boolean) specifies whether the task branch will be opened initially (to show child tasks)
    task_open = models.BooleanField(default = True, blank = True)

    # (string) the date when a task is scheduled to be completed. Used as an alternative to the
    # duration property for setting the duration of the task
    end_date = models.CharField(max_length = 10, blank = True)
