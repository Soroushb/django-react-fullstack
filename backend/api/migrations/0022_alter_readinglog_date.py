# Generated by Django 5.0.3 on 2024-05-18 17:53

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0021_dayplan'),
    ]

    operations = [
        migrations.AlterField(
            model_name='readinglog',
            name='date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
