# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('collector', '0019_twitterdata_lombardy'),
    ]

    operations = [
        migrations.AlterField(
            model_name='twitterdata',
            name='date',
            field=models.DateTimeField(null=True, blank=True),
        ),
        migrations.AlterIndexTogether(
            name='twitterdata',
            index_together=set([('lombardy', 'date')]),
        ),
    ]
