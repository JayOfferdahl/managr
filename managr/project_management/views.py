from collections import OrderedDict
from django.http import JsonResponse
from django.http import HttpResponse
from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.utils.six import BytesIO
from django.core.exceptions import ObjectDoesNotExist

from managr_entities.app_models.managr_user import ManagrUser
from project_management.app_models.project import Project
from project_management.app_models.milestone import Milestone
from project_management.app_models.milestone_link import MilestoneLink
from project_management.app_forms.create_project_form import CreateProjectForm

@csrf_exempt
def getUserProjectMetadata(request):
    session_token = JSONParser().parse(BytesIO(request.body))

    if session_token:
        try:
            managr_user = ManagrUser.objects.get(session_token=session_token)
        except ManagrUser.DoesNotExist:
            # Session token given does not belong to any user
            return JsonResponse({'failure': 'Unable to authenticate'})

        projects = managr_user.projects.all().order_by('name')

        project_metadata = OrderedDict()

        for project in projects:
            project_metadata[project.name] = project.project_uuid

        return JsonResponse({
            'success': 'Projects returned for user.',
            'data': project_metadata
        })
    else:
        return JsonResponse({'error': 'No session token provided.'})

@csrf_exempt
def createNewProject(request):
    project_data = JSONParser().parse(BytesIO(request.body))

    if 'session_token' in project_data:
        try:
            managr_user = ManagrUser.objects.get(session_token=project_data['session_token'])
        except ManagrUser.DoesNotExist:
            # Session token given does not belong to any user
            return JsonResponse({'failure': 'Unable to authenticate'})

        create_project_form = CreateProjectForm(project_data)

        if create_project_form.is_valid():
            new_project = Project.objects.create_new_project(project_data, managr_user)
            managr_user.projects.add(new_project)
            managr_user.save()
            return JsonResponse({'success': 'Successful project creation', 'new_project_uuid': str(new_project.project_uuid)})
        else:
            errors = dict([(key, [str(error) for error in value]) for key, value in create_project_form.errors.items()])
            return JsonResponse(errors)
    else:
        return JsonResponse({'error': 'No session token provided.'})

@csrf_exempt
def getProjectInfo(request):
    data = JSONParser().parse(BytesIO(request.body))
    
    if 'session_token' in data:
        try:
            managr_user = ManagrUser.objects.get(session_token=data['session_token'])
        except ManagrUser.DoesNotExist:
            # Session token given does not belong to any user
            return JsonResponse({'failure': 'Unable to authenticate'})

        clientExists = False

        try:
            project = Project.objects.get(project_uuid = data['project_uuid'])
            contractorCompany = project.company_owner
            contractor = contractorCompany.owner_or_creator

            clientCompany = contractorCompany
            client = contractor
            
            if project.client != None:
                clientCompany = project.client
                client = clientCompany.owner_or_creator
                clientExists = True
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'Invalid request.'})

        return JsonResponse({
            'success': 'Project fetch success',
            'name': project.name,
            'budget': project.budget,
            'description': project.description,
            'contractor_name': contractorCompany.name,
            'contractor_contact': contractor.first_name + " " + contractor.last_name + ", " + project.contractor_contact_number,
            'client_name': clientCompany.name,
            'client_contact': client.first_name + " " + client.last_name + ", " + project.client_contact_number,
            'client_exists': clientExists,
        })
    else:
        return JsonResponse({'error': 'No session token provided.'})


@csrf_exempt
def getMilestones(request, project_uuid):
    milestoneDict = dict()
    milestoneDict['data'] = []
    milestoneDict['links'] = []
    
    # Get all milestone objects for this project
    milestones = Milestone.objects.filter(project__project_uuid = project_uuid)
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
    milestoneLinks = MilestoneLink.objects.filter(project__project_uuid = project_uuid)
    for link in milestoneLinks:
        milestoneDict['links'].append({
            "source":   link.source,
            "target":   link.target,
            "type":     link.task_type,
        })

    return JsonResponse(milestoneDict)    

@csrf_exempt
def dataProcessor(request, project_uuid):
    requestError = {'error': 'Invalid request method.'}

    if request.method == 'POST':
        request_type = request.POST['!nativeeditor_status']

        # If the source field is present, it's a link
        if 'source' in request.POST:
            if request_type == 'inserted':
                link = MilestoneLink()

                try:
                    link.project = Project.objects.get(project_uuid = project_uuid)
                except ObjectDoesNotExist:
                    return HttpResponse(requestError)

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
                try:
                    link = Link(pk = request.POST['id'])
                except ObjectDoesNotExist:
                    return HttpResponse(requestError)

                link.delete()
                response = {
                    'type': 'update',
                    'sid': request.POST['id'],
                    'tid': '0'
                }
            elif request_type == 'updated':
                try:
                    link = Link(pk = request.POST['id'])
                except ObjectDoesNotExist:
                    return HttpResponse(requestError)

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
                try:
                    milestone.project = Project.objects.get(project_uuid = project_uuid)
                except ObjectDoesNotExist:
                    return HttpResponse(requestError)

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
                
                milestone.save()

                response = {
                    'type' : 'insert',
                    'sid': request.POST['id'],
                    'tid': milestone.id
                }
            elif request_type == 'deleted':
                try:
                    milestone = Milestone(pk = request.POST['id'])
                except ObjectDoesNotExist:
                    return HttpResponse(requestError)

                milestone.delete()
                response = {
                    'type': 'delete',
                    'sid': request.POST['id'],
                    'tid': '0'
                }
            elif request_type == 'updated':
                try:
                    milestone = Milestone.objects.get(pk = request.POST['id'])
                except ObjectDoesNotExist:
                    return HttpResponse(requestError)


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

        return HttpResponse(response)
    return HttpResponse(requestError)
