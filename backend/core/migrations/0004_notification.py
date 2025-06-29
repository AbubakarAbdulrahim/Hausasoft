# Generated by Django 5.2.1 on 2025-05-19 12:03

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_course_status_lesson_release_date_payment_provider_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField()),
                ('type', models.CharField(choices=[('info', 'Info'), ('success', 'Success'), ('warning', 'Warning'), ('error', 'Error'), ('enrollment', 'Enrollment'), ('course', 'Course'), ('lesson', 'Lesson'), ('quiz', 'Quiz'), ('payment', 'Payment'), ('certificate', 'Certificate')], default='info', max_length=20)),
                ('link', models.URLField(blank=True, null=True)),
                ('read', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notifications', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
