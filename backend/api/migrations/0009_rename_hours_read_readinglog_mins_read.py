# Generated by Django 5.0.3 on 2024-05-06 15:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_remove_readinglog_book_readinglog_date_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='readinglog',
            old_name='hours_read',
            new_name='mins_read',
        ),
    ]
