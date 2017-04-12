from datetime import datetime, timedelta, timezone

from django.contrib.auth import login as django_login, authenticate
from django.http import JsonResponse
from django.utils.six import BytesIO
from django.views.decorators.csrf import csrf_exempt

from rest_framework import serializers
from rest_framework.parsers import JSONParser

from managr_entities.app_forms.registration_form import RegistrationForm
from managr_entities.app_forms.login_form import LoginForm
from managr_entities.app_forms.create_contractor_company_form import CreateContractorCompanyForm
from managr_entities.app_models.managr_user import ManagrUser
from managr_entities.app_models.company import Company

from helpers.states_array import states_array

@csrf_exempt
def register(request):
	registration_data = JSONParser().parse(BytesIO(request.body))
	registration_form = RegistrationForm(registration_data)
	
	if registration_form.is_valid():
		managr_user = ManagrUser.objects.register_user(registration_data)
		django_login(request, managr_user)
		return JsonResponse({'success': str(managr_user.session_token)})
	else:
		errors = dict([(key, [str(error) for error in value]) for key, value in registration_form.errors.items()])
		return JsonResponse(errors)

@csrf_exempt
def login(request):
	login_data = JSONParser().parse(BytesIO(request.body))
	login_form = LoginForm(login_data)

	if login_form.is_valid():
		if login_form.email_as_username == True: # Perform log in by email
			managr_user = ManagrUser.objects.get(email = login_data['username_or_email'])
		else:
			managr_user = ManagrUser.objects.get(username = login_data['username_or_email'])

		managr_user = authenticate(username = managr_user.username, password = login_data['password'])
		if managr_user == None:
			return JsonResponse({'invalid_credentials': ['No account matches the given username/email & password']})

		django_login(request, managr_user)
		managr_user.session_token = ManagrUser.objects.generate_new_session_token()
		managr_user.save()
		return JsonResponse({'success': str(managr_user.session_token)})
	else:
		errors = dict([(key, [str(error) for error in value]) for key, value in login_form.errors.items()])
		return JsonResponse(errors)

@csrf_exempt
def logout(request):
	session_token = JSONParser().parse(BytesIO(request.body))
	try:
		managr_user = ManagrUser.objects.get(session_token = session_token)
	except ManagrUser.DoesNotExist:
		# Logout attempted on session id that doesn't exist, still return success for security reasons
		return JsonResponse({'success': 'Successful logout'})

	managr_user.session_token = None
	managr_user.save()
	return JsonResponse({'success': 'Successful logout'})

@csrf_exempt
def ensureAuth(request):
	session_token = JSONParser().parse(BytesIO(request.body))
	try:
		managr_user = ManagrUser.objects.get(session_token = session_token)
	except ManagrUser.DoesNotExist:
		# Session token given does not belong to any user
		return JsonResponse({'failure': 'Unable to authenticate'})
		
	time_since_last_login = (datetime.now(timezone.utc) - managr_user.last_login).total_seconds() / 3600
	if time_since_last_login > 5:
		managr_user.session_token = None
		managr_user.save()
		return JsonResponse({'failure': 'Unable to authenticate'})
	else:
		return JsonResponse({'success': 'Successful authentication'})

@csrf_exempt
def createContractorCompany(request):
	company_data = JSONParser().parse(BytesIO(request.body))
	contractor_company_creation_form = CreateContractorCompanyForm(company_data)

	if contractor_company_creation_form.is_valid():
		print(company_data)
		new_company = Company.objects.create_contractor_company(company_data['company_name'], company_data['company_email'], company_data['address'], company_data['city'], states_array[int(company_data['state'])], company_data['postal_code'], company_data['description'])
		return JsonResponse({'success': 'Successful company creation'})
	else:
		errors = dict([(key, [str(error) for error in value]) for key, value in contractor_company_creation_form.errors.items()])
		return JsonResponse(errors)

