"""managr URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include
from django.conf.urls import url
from django.contrib import admin
from django.views.generic import TemplateView

from . import views as managr_views
from managr_entities import views as managr_entities_views

urlpatterns = [
    # Organize these url patterns by which views they belong to
    url(r'^admin/', admin.site.urls),

    # Begin managr_entities_views
    url(r'^accounts/login', managr_entities_views.login, name='login'),
    url(r'^accounts/logout', managr_entities_views.logout, name='logout'),
    url(r'^accounts/signup', managr_entities_views.register, name='register'),
    url(r'^accounts/ensure-auth', managr_entities_views.ensureAuth, name='ensure_auth'),

    # Begin managr_views
    url(r'^', managr_views.index, name='index'),
]
