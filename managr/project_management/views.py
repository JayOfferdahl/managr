from django.http import JsonResponse
from django.http import HttpResponse
from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt

from project_management.app_models.project import Project
from project_management.app_models.milestone import Milestone
from project_management.app_models.milestone_link import MilestoneLink

@csrf_exempt
def getMilestones(request):
    milestoneDict = dict()
    milestoneDict['data'] = []
    milestoneDict['links'] = []
    
    # Get all milestone objects for this project
    milestones = Milestone.objects.all()
    for milestone in milestones:
        milestoneDict['data'].append({
            "id":           milestone.id,
            "text":         milestone.text,
            "start_date":   milestone.start_date.strftime("%Y-%m-%d %H:%M"),
            "duration":     milestone.duration,
            "task_type":    milestone.task_type,
            "parent":       milestone.parent_id,
            "level":        milestone.level,
            "progress":     milestone.progress,
            "open":         milestone.task_open,
            "end_date":     milestone.end_date.strftime("%Y-%m-%d %H:%M")
        })

    # Get all milestone link objects for this project
    milestoneLinks = MilestoneLink.objects.all()
    for link in milestoneLinks:
        milestoneDict['links'].append({
            "source":   link.source,
            "target":   link.target,
            "type":     link.task_type,
        })

    print(milestoneDict)
    return JsonResponse(milestoneDict)    

@csrf_exempt
def dataProcessor(request):    
    if request.method == 'POST':
        request_type = request.POST['!nativeeditor_status']
        for key, value in request.POST.items():
            print(key, value)

        # If the source field is present, it's a link
        if 'source' in request.POST:
            if request_type == 'inserted':
                link = MilestoneLink()

                # TODO -> Get the correct project from the front end.
                link.project = Project.objects.all()[0]
                link.source = request.POST['source']
                link.target = request.POST['target']
                link.task_type = request.POST['type']
                link.save()
                response = {
                    'type' : 'insert',
                    'sid': request.POST['id'],
                    'tid': link.id
                }
            elif request_type == 'deleted':
                link = Link(pk = request.POST['id'])
                link.delete()
                response = {
                    'type': 'update',
                    'sid': request.POST['id'],
                    'tid': '0'
                }
            elif request_type == 'updated':
                link = Link(pk = request.POST['id'])
                link.source = request.POST['source']
                link.target = request.POST['target']
                link.task_type = request.POST['type']
                link.save()
                response = {
                    'type': 'update',
                    'sid': link.id,
                    'tid': link.id
                }
            else:
                response = {
                    'type': 'error',
                    'sid': request.POST['id'],
                    'tid': '0'
                }
        else:
            if request_type == 'inserted':
                milestone = Milestone()
                
                # Required

                # TODO -> Get the correct project from the front end.
                milestone.project = Project.objects.all()[0]
                milestone.text = request.POST['text']
                milestone.start_date = request.POST['start_date']
                milestone.duration = request.POST['duration']

                # Optional
                if 'task_type' in request.POST:
                    milestone.task_type = request.POST['task_type']
                if 'parent' in request.POST:
                    milestone.parent_id = request.POST['parent']
                if 'level' in request.POST and request.POST['level']:
                    milestone.level = request.POST['level']
                if 'progress' in request.POST:
                    milestone.progress = float(request.POST['progress'])
                if 'task_open' in request.POST:
                    milestone.task_open = request.POST['task_open']
                if 'end_date' in request.POST:
                    milestone.end_date = request.POST['end_date']

                print(request.POST['parent'])
                
                milestone.save()

                response = {
                    'type' : 'insert',
                    'sid': request.POST['id'],
                    'tid': milestone.id
                }
            elif request_type == 'deleted':
                milestone = Milestone(pk = request.POST['id'])
                milestone.delete()
                response = {
                    'type': 'delete',
                    'sid': request.POST['id'],
                    'tid': '0'
                }
            elif request_type == 'updated':
                milestone = Milestone.objects.get(pk = request.POST['id'])
                print(milestone)

                # Required
                milestone.text = request.POST['text']
                milestone.start_date = request.POST['start_date']
                milestone.duration = request.POST['duration']

                # Optional
                if 'task_type' in request.POST:
                    milestone.task_type = request.POST['task_type']
                if 'parent' in request.POST:
                    milestone.parent_id = request.POST['parent']
                if 'level' in request.POST and request.POST['level']:
                    print(request.POST['level'])
                    milestone.level = request.POST['level']
                if 'progress' in request.POST:
                    milestone.progress = float(request.POST['progress'])
                if 'task_open' in request.POST:
                    milestone.task_open = request.POST['task_open']
                if 'end_date' in request.POST:
                    milestone.end_date = request.POST['end_date']
                
                milestone.save()

                response = {
                    'type': 'update',
                    'sid': milestone.id,
                    'tid': milestone.id
                }
            else:
                response = {
                    'type': 'error',
                    'sid': request.POST['id'],
                    'tid': '0'
                }

        print(response)
        return HttpResponse(response)
    return HttpResponse({'error': 'Invalid request method.'})