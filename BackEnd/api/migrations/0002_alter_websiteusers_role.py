# Generated by Django 4.1.7 on 2023-03-21 12:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='websiteusers',
            name='role',
            field=models.CharField(choices=[('Patient', 'Patient'), ('Treatment Center', 'Treatment Center'), ('Tourist', 'Tourist'), ('Tourism Company', 'Tourism Company')], default='Patient', max_length=50),
        ),
    ]
