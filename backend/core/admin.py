from django.contrib import admin
from .models import User, Course, Enrollment, Progress, Achievement, Lesson, Quiz, Question, Option, QuizAttempt, Payment, Certificate, Notification, SupportTicket, Service, TeamMember

# Register your models here.
admin.site.register(User)
admin.site.register(Course)
admin.site.register(Enrollment)
admin.site.register(Progress)
admin.site.register(Achievement)
admin.site.register(Lesson)
admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(Option)
admin.site.register(QuizAttempt)
admin.site.register(Payment)
admin.site.register(Certificate)
admin.site.register(Notification)
admin.site.register(SupportTicket)
admin.site.register(Service)
admin.site.register(TeamMember)
