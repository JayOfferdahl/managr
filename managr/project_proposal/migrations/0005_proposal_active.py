# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-04-21 17:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project_proposal', '0004_auto_20170421_1700'),
    ]

    operations = [
        migrations.AddField(
            model_name='proposal',
            name='active',
            field=models.BooleanField(default=True),
        ),
    ]