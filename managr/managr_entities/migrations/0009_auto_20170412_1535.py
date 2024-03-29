# -*- coding: utf-8 -*- 
# Generated by Django 1.10.5 on 2017-04-12 15:35 
from __future__ import unicode_literals 
 
from django.conf import settings 
from django.db import migrations, models 
import django.db.models.deletion 
 
 
class Migration(migrations.Migration): 
 
    dependencies = [ 
        ('managr_entities', '0008_managruser_session_token'), 
    ] 
 
    operations = [ 
        migrations.AddField( 
            model_name='company', 
            name='owner_or_creator', 
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, related_name='+', to=settings.AUTH_USER_MODEL), 
            preserve_default=False, 
        ), 
        migrations.AddField( 
            model_name='managruser', 
            name='company', 
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='managr_entities.Company'), 
        ), 
    ] 
