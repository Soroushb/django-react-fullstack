# Generated by Django 5.0.3 on 2024-05-17 01:59

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_remove_goallist_goal_goallist_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='goallog',
            name='date',
            field=models.DateField(default=django.utils.timezone.now, unique=True),
        ),
    ]
