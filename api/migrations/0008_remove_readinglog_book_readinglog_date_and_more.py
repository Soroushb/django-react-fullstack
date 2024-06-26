# Generated by Django 5.0.3 on 2024-05-06 15:26

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_readinglog'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='readinglog',
            name='book',
        ),
        migrations.AddField(
            model_name='readinglog',
            name='date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='readinglog',
            name='hours_read',
            field=models.DecimalField(decimal_places=2, max_digits=5),
        ),
    ]
