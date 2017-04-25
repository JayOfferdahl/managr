import base64

from django.http import JsonResponse
from django.utils.six import BytesIO
from django.views.decorators.csrf import csrf_exempt

import os

from django.core.files import File

from rest_framework import serializers
from rest_framework.parsers import JSONParser

from documents.app_models.document import Document
from managr_entities.app_models.managr_user import ManagrUser
from managr_entities.app_models.company import Company
from project_management.app_models.project import Project

@csrf_exempt
def getProjectDocuments(request):
    data = JSONParser().parse(BytesIO(request.body))

    if 'session_token' in data:
        try:
            managr_user = ManagrUser.objects.get(session_token=data['session_token'])
        except ManagrUser.DoesNotExist:
            # Session token given does not belong to any user
            return JsonResponse({'failure': 'Unable to authenticate'})

        project = Project.objects.get(project_uuid = data['project_uuid'])
        documents = Document.objects.filter(project = project).order_by('title')
        google_documents, uploaded_documents = Document.objects.separate_google_and_uploaded_docs(documents)
        documents_data = Document.objects.build_documents_data(google_documents, uploaded_documents)

        return JsonResponse({'success': 'Project fetch success', 'documents_data': documents_data})
    else:
        return JsonResponse({'error': 'No session token provided.'})

@csrf_exempt
def newGoogleProjectDocument(request):
    data = JSONParser().parse(BytesIO(request.body))
    
    document = Document()
    document.title = data['doc_title']
    document.view_link = data['doc_link']
    document.project = Project.objects.get(project_uuid = data['project_uuid'])
    document.creator = ManagrUser.objects.get(session_token=data['session_token'])
    document.company = ManagrUser.objects.get(session_token=data['session_token']).company

    document.save()

    return JsonResponse({'success': 'New Google Document Success'})

@csrf_exempt
def newUploadedProjectDocument(request):
    data = JSONParser().parse(BytesIO(request.body))
    encoded_file = data['doc_file'].split('base64,',1)[1]
    decoded_file = base64.b64decode(encoded_file)
    
    document = Document()
    document.title = data['doc_title']
    document.project = Project.objects.get(project_uuid = data['project_uuid'])
    document.project_name = Project.objects.get(project_uuid = data['project_uuid']).name
    document.creator = ManagrUser.objects.get(session_token=data['session_token'])
    document.company = ManagrUser.objects.get(session_token=data['session_token']).company
    document.company_name = ManagrUser.objects.get(session_token=data['session_token']).company.name

    temp_managr_file = open('/home/jofferda/dev/managr/managr/documents/temp_uploaded_documents/temp_written_documents/' + document.title.replace(' ', '_') + '.txt', 'wb')
    temp_managr_file.write(decoded_file)
    temp_managr_file.close()

    document.uploaded_file = File(open('/home/jofferda/dev/managr/managr/documents/temp_uploaded_documents/temp_written_documents/' + document.title.replace(' ', '_') + '.txt'), document.title.replace(' ', '_') + '.txt')
    document.save()
    os.remove('/home/jofferda/dev/managr/managr/documents/temp_uploaded_documents/temp_written_documents/' + document.title.replace(' ', '_') + '.txt')

    return JsonResponse({'success': 'New Uploaded Document Success'})

