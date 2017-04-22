from collections import OrderedDict

from django.http import JsonResponse
from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt

from managr_entities.app_models.managr_user import ManagrUser
from project_management.app_models.project import Project
from project_management.app_forms.create_project_form import CreateProjectForm

from rest_framework.parsers import JSONParser
from django.utils.six import BytesIO

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
    print(data)
    if 'session_token' in data:
        try:
            managr_user = ManagrUser.objects.get(session_token=data['session_token'])
        except ManagrUser.DoesNotExist:
            # Session token given does not belong to any user
            return JsonResponse({'failure': 'Unable to authenticate'})

        project = Project.objects.get(project_uuid = data['project_uuid'])
        return JsonResponse({'success': 'Project fetch success', 'project_name': project.name, 'project_budget': project.budget, 'project_description': project.description})
    else:
        return JsonResponse({'error': 'No session token provided.'})
