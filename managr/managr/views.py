from django.http import JsonResponse

def index(request):
    data = {'data': 'Hello from the Managr Server'}
    return JsonResponse(data)