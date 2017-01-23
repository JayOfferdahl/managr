# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-11-27 20:38
from __future__ import unicode_literals

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('managr_entities', '0003_company'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='company_uuid',
            field=models.UUIDField(default=uuid.uuid4, editable=False),
        ),
    ]