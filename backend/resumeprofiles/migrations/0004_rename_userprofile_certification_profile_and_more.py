# Generated by Django 5.1.4 on 2025-01-09 11:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('resumeprofiles', '0003_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='certification',
            old_name='userprofile',
            new_name='profile',
        ),
        migrations.RenameField(
            model_name='education',
            old_name='userprofile',
            new_name='profile',
        ),
        migrations.RenameField(
            model_name='experience',
            old_name='userprofile',
            new_name='profile',
        ),
        migrations.RenameField(
            model_name='project',
            old_name='userprofile',
            new_name='profile',
        ),
        migrations.RenameField(
            model_name='sociallink',
            old_name='userprofile',
            new_name='profile',
        ),
    ]
