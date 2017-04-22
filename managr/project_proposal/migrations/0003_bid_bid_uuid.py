# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-04-19 07:13
from __future__ import unicode_literals

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('project_proposal', '0002_auto_20170417_0755'),
    ]

    operations = [
        migrations.AddField(
            model_name='bid',
            name='bid_uuid',
            field=models.UUIDField(default=uuid.uuid4, editable=False),
        ),
    ]