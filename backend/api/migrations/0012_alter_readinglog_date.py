# Generated by Django 5.0.3 on 2024-05-06 22:36

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_alter_goallog_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='readinglog',
            name='date',
            field=models.DateField(default=django.utils.timezone.now, unique=True),
        ),
    ]
