from django.http import JsonResponse
from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt

from project_management.app_models.milestone import Milestone
from project_management.app_models.milestone_link import MilestoneLink

@csrf_exempt
def getMilestones(request):
    # tasks =  {
    #     "data":[
    #         {"id":1, "text":"Backend Connection","start_date":"01-04-2013", "duration":11,
    #         "progress": 0.6, "open": "true"},
    #         {"id":2, "text":"Has Been",   "start_date":"03-04-2013", "duration":5, 
    #         "progress": 1,   "open": "true", "parent":1},
    #         {"id":3, "text":"Established!",   "start_date":"02-04-2013", "duration":7, 
    #         "progress": 0.5, "open": "true", "parent":1},
    #         {"id":4, "text":"Here's a task, if you care.", "start_date":"03-04-2013", "duration":2, 
    #         "progress": 1,   "open": "true", "parent":3},
    #         {"id":5, "text":"This is from the django server!", "start_date":"04-04-2013", "duration":3, 
    #         "progress": 0.8, "open": "true", "parent":3},
    #         {"id":6, "text":"Task #2.3", "start_date":"05-04-2013", "duration":4, 
    #         "progress": 0.2, "open": "true", "parent":3}
    #     ],
    #     "links":[
    #         {"id":1, "source":1, "target":2, "type":"1"},
    #         {"id":2, "source":1, "target":3, "type":"1"},
    #         {"id":3, "source":3, "target":4, "type":"1"},
    #         {"id":4, "source":4, "target":5, "type":"0"},
    #         {"id":5, "source":5, "target":6, "type":"0"}
    #     ]
    # }

    return JsonResponse(buildMilestoneDictionary(10))

# Builds the dictionary of milestone objects with the given project_uuid
def buildMilestoneDictionary(project_uuid):
    milestones = Milestone.objects.all()
    milestoneDict = dict()
    milestoneDict['data'] = []

    for milestone in milestones:
        milestoneDict['data'].append({
            "id":           milestone.id,
            "text":         milestone.text,
            "start_date":   milestone.start_date,
            "duration":     milestone.duration,
            "task_type":    milestone.task_type,
            "parent_id":    milestone.parent_id,
            "level":        milestone.level,
            "progress":     milestone.progress,
            "open":         milestone.task_open,
            "end_date":     milestone.end_date
            })
    print(milestoneDict)
    return milestoneDict


def updateMilestones(request):
    pass