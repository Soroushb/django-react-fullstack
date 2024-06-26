# Generated by Django 5.0.3 on 2024-05-11 15:36

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_remove_goallist_goals_goallist_goal'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='goallist',
            name='goal',
        ),
        migrations.AddField(
            model_name='goallist',
            name='date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='goallist',
            name='mins_done',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=5),
            preserve_default=False,
        ),
    ]
