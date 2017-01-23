# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-11-30 07:21
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('managr_entities', '0004_company_company_uuid'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('project_management', '0002_project'),
        ('documents', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('company_name', models.CharField(max_length=255)),
                ('project_name', models.CharField(max_length=255)),
                ('creator_name', models.CharField(max_length=255)),
                ('edit_link', models.URLField(max_length=500, null=True)),
                ('view_link', models.URLField(max_length=500, null=True)),
                ('uploaded_file', models.FileField(null=True, upload_to='documents/')),
                ('company', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='managr_entities.Company')),
                ('creator', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='creator', to=settings.AUTH_USER_MODEL)),
                ('editors', models.ManyToManyField(related_name='editors', to=settings.AUTH_USER_MODEL)),
                ('project', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='project_management.Project')),
                ('viewers', models.ManyToManyField(related_name='viewers', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]