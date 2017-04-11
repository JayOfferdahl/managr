# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-11-27 20:38
from __future__ import unicode_literals

import django.contrib.postgres.fields.hstore
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('managr_entities', '0004_company_company_uuid'),
        ('project_proposal', '0002_proposal'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bid',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('details', django.contrib.postgres.fields.hstore.HStoreField()),
                ('corresponding_proposal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='project_proposal.Proposal')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='managr_entities.Company')),
            ],
        ),
    ]