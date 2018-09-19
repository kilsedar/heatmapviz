# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('collector', '0020_auto_20161111_1124'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gpsdata',
            name='latitude',
            field=models.DecimalField(max_digits=11, decimal_places=7, blank=True),
        ),
        migrations.AlterField(
            model_name='gpsdata',
            name='longitude',
            field=models.DecimalField(max_digits=11, decimal_places=7, blank=True),
        ),
        migrations.AlterField(
            model_name='gpsdata',
            name='platform',
            field=models.CharField(default=b'FLC', max_length=10, choices=[(b'FLC', b'FLC'), (b'PNR', b'PNR'), (b'FSQ', b'FSQ')]),
        ),
    ]
