from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('instructor', 'Instructor'),
        ('admin', 'Admin'),
    )
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student')
    avatar = models.URLField(blank=True, null=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    language = models.CharField(max_length=10, default='en')

class Course(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('pending', 'Pending Approval'),
        ('published', 'Published'),
        ('rejected', 'Rejected'),
    )
    title = models.CharField(max_length=255)
    description = models.TextField()
    thumbnail = models.URLField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_free = models.BooleanField(default=False)
    category = models.CharField(max_length=100)
    level = models.CharField(max_length=50)
    duration = models.CharField(max_length=50)
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses')
    rating = models.FloatField(default=0)
    students_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

class Enrollment(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    enrolled_at = models.DateTimeField(auto_now_add=True)
    progress = models.FloatField(default=0)
    completed = models.BooleanField(default=False)

class Progress(models.Model):
    enrollment = models.OneToOneField(Enrollment, on_delete=models.CASCADE, related_name='progress_record')
    lessons_completed = models.PositiveIntegerField(default=0)
    last_accessed = models.DateTimeField(auto_now=True)

class Achievement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='achievements')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    awarded_at = models.DateTimeField(auto_now_add=True)

class Lesson(models.Model):
    LESSON_TYPE_CHOICES = (
        ('video', 'Video'),
        ('text', 'Text'),
        ('quiz', 'Quiz'),
    )
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True, null=True)
    order = models.PositiveIntegerField()
    lesson_type = models.CharField(max_length=10, choices=LESSON_TYPE_CHOICES, default='video')
    duration = models.CharField(max_length=20, blank=True, null=True)
    release_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        ordering = ['order']

class Quiz(models.Model):
    lesson = models.OneToOneField(Lesson, on_delete=models.CASCADE, related_name='quiz')
    title = models.CharField(max_length=255)

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    text = models.CharField(max_length=512)

class Option(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='options')
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

class QuizAttempt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quiz_attempts')
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='attempts')
    score = models.FloatField(default=0)
    completed_at = models.DateTimeField(auto_now_add=True)

class Payment(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('failed', 'Failed'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='payments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    transaction_id = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    provider = models.CharField(max_length=50, blank=True, null=True)
    reference = models.CharField(max_length=100, blank=True, null=True)
    webhook_payload = models.JSONField(blank=True, null=True)

class Certificate(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='certificates')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='certificates')
    issued_at = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to='certificates/', blank=True, null=True)

class Notification(models.Model):
    NOTIFICATION_TYPES = [
        ('info', 'Info'),
        ('success', 'Success'),
        ('warning', 'Warning'),
        ('error', 'Error'),
        ('enrollment', 'Enrollment'),
        ('course', 'Course'),
        ('lesson', 'Lesson'),
        ('quiz', 'Quiz'),
        ('payment', 'Payment'),
        ('certificate', 'Certificate'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    message = models.TextField()
    type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES, default='info')
    link = models.URLField(blank=True, null=True)
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class SupportTicket(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    resolved = models.BooleanField(default=False)

class Service(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    features = models.JSONField(default=list)

class TeamMember(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    avatar = models.URLField()
    bio = models.TextField(blank=True)
