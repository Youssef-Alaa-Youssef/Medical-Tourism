# Generated by Django 4.1.7 on 2023-03-29 12:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0024_remove_tretment_center_doctor_id_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='doctor',
            name='treatment_center',
        ),
    ]
