from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import User, Course, Enrollment, Progress, Achievement, Lesson, Quiz, Question, Option, QuizAttempt, Payment, Certificate, Notification, SupportTicket, Service, TeamMember
from .serializers import UserSerializer, CourseSerializer, EnrollmentSerializer, ProgressSerializer, AchievementSerializer, LessonSerializer, QuizSerializer, QuestionSerializer, OptionSerializer, QuizAttemptSerializer, PaymentSerializer, CertificateSerializer, NotificationSerializer, SupportTicketSerializer, ServiceSerializer, TeamMemberSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth import get_user_model
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from django.utils import timezone
from django.core.mail import EmailMessage
from django.conf import settings
import io
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from django.core.files.base import ContentFile
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save
from django.template.loader import render_to_string
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth.hashers import make_password
import re
from django.core.cache import cache
from datetime import timedelta
from django.http import JsonResponse
from .gemini_utils import get_gemini_response
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def partial_update(self, request, *args, **kwargs):
        # Allow users to update their language
        if 'language' in request.data:
            self.get_object().language = request.data['language']
            self.get_object().save()
        return super().partial_update(request, *args, **kwargs)

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or (hasattr(user, 'role') and user.role == 'admin'):
            return Course.objects.all()
        elif hasattr(user, 'role') and user.role == 'instructor':
            return Course.objects.filter(instructor=user)
        else:
            # Students see only published courses
            return Course.objects.filter(status='published')

    def perform_create(self, serializer):
        user = self.request.user
        if not (user.is_staff or (hasattr(user, 'role') and user.role == 'instructor')):
            raise PermissionDenied('Only instructors or admins can create courses.')
        serializer.save(instructor=user, status='pending')

    def perform_update(self, serializer):
        user = self.request.user
        course = self.get_object()
        if not (user.is_staff or (hasattr(user, 'role') and user.role == 'admin') or (hasattr(user, 'role') and user.role == 'instructor' and course.instructor == user)):
            raise PermissionDenied('You do not have permission to edit this course.')
        serializer.save()

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or (hasattr(user, 'role') and user.role == 'admin'):
            return Enrollment.objects.all()
        return Enrollment.objects.filter(student=user)

    def perform_create(self, serializer):
        user = self.request.user
        course = serializer.validated_data['course']
        if course.is_free:
            serializer.save(student=user)
        else:
            if not has_paid(user, course):
                raise PermissionDenied('You must pay for this course before enrolling.')
            serializer.save(student=user)

class ProgressViewSet(viewsets.ModelViewSet):
    queryset = Progress.objects.all()
    serializer_class = ProgressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or (hasattr(user, 'role') and user.role == 'admin'):
            return Progress.objects.all()
        return Progress.objects.filter(enrollment__student=user)

class AchievementViewSet(viewsets.ModelViewSet):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer
    permission_classes = [permissions.IsAuthenticated]

class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        now = timezone.now()
        if user.is_staff or (hasattr(user, 'role') and user.role == 'admin'):
            return Lesson.objects.all()
        if user.is_authenticated:
            enrolled_courses = Course.objects.filter(enrollments__student=user)
            instructs_courses = Course.objects.filter(instructor=user)
            # Only show released lessons for students
            return Lesson.objects.filter(course__in=enrolled_courses | instructs_courses, release_date__lte=now)
        return Lesson.objects.none()

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or (hasattr(user, 'role') and user.role == 'admin'):
            return Quiz.objects.all()
        if user.is_authenticated:
            enrolled_courses = Course.objects.filter(enrollments__student=user)
            instructs_courses = Course.objects.filter(instructor=user)
            return Quiz.objects.filter(lesson__course__in=enrolled_courses | instructs_courses)
        return Quiz.objects.none()

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class OptionViewSet(viewsets.ModelViewSet):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class QuizAttemptViewSet(viewsets.ModelViewSet):
    queryset = QuizAttempt.objects.all()
    serializer_class = QuizAttemptSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or (hasattr(user, 'role') and user.role == 'admin'):
            return QuizAttempt.objects.all()
        return QuizAttempt.objects.filter(user=user)

    def perform_create(self, serializer):
        user = self.request.user
        quiz = serializer.validated_data['quiz']
        course = quiz.lesson.course
        if not (is_enrolled(user, course) or user == course.instructor or user.is_staff):
            raise PermissionDenied('You must be enrolled in the course to attempt this quiz.')
        serializer.save(user=user)

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

class CertificateViewSet(viewsets.ModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or (hasattr(user, 'role') and user.role == 'admin'):
            return Certificate.objects.all()
        return Certificate.objects.filter(user=user)

    @action(detail=False, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def generate(self, request):
        user = request.user
        course_id = request.data.get('course_id')
        from .models import Course
        course = Course.objects.get(id=course_id)
        # Check if user completed the course
        if not Enrollment.objects.filter(student=user, course=course, completed=True).exists():
            return Response({'error': 'Course not completed.'}, status=400)
        cert, created = Certificate.objects.get_or_create(user=user, course=course)
        if not cert.file:
            # Generate PDF
            buffer = io.BytesIO()
            p = canvas.Canvas(buffer, pagesize=letter)
            p.setFont('Helvetica-Bold', 24)
            p.drawCentredString(300, 700, 'Certificate of Completion')
            p.setFont('Helvetica', 16)
            p.drawCentredString(300, 650, f'Awarded to: {user.get_full_name() or user.email}')
            p.drawCentredString(300, 620, f'For completing the course: {course.title}')
            p.setFont('Helvetica', 12)
            p.drawCentredString(300, 580, f'Date: {timezone.now().strftime("%Y-%m-%d")}')
            p.showPage()
            p.save()
            buffer.seek(0)
            cert.file.save(f'certificate_{user.id}_{course.id}.pdf', ContentFile(buffer.read()))
            buffer.close()
            # Send email with certificate
            subject = f'Your Certificate for {course.title}'
            message = f'Congratulations {user.get_full_name() or user.email}!\n\nAttached is your certificate for completing {course.title}.'
            email = EmailMessage(subject, message, settings.DEFAULT_FROM_EMAIL, [user.email])
            cert.file.open('rb')
            email.attach(cert.file.name, cert.file.read(), 'application/pdf')
            cert.file.close()
            email.send(fail_silently=True)
        return Response(CertificateSerializer(cert).data)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def payment_webhook(request):
    # This is a generic webhook endpoint for payment providers
    # You should add provider-specific validation here
    provider = request.data.get('provider')
    reference = request.data.get('reference')
    status = request.data.get('status')
    try:
        payment = Payment.objects.get(reference=reference, provider=provider)
        payment.status = status
        payment.webhook_payload = request.data
        payment.save()
        return Response({'success': True})
    except Payment.DoesNotExist:
        return Response({'error': 'Payment not found.'}, status=404)

# Helper function to check enrollment

def is_enrolled(user, course):
    return course.enrollments.filter(student=user, completed=False).exists()

def has_paid(user, course):
    return course.payments.filter(user=user, status='paid').exists()

# Helper function to send emails with HTML templates
def send_notification_email(subject, message, recipient_list, template=None, context=None, attachments=None):
    email = EmailMessage(subject, message, settings.DEFAULT_FROM_EMAIL, recipient_list)
    if template and context:
        html_content = render_to_string(template, context)
        email.content_subtype = 'html'
        email.body = html_content
    if attachments:
        for name, content, mimetype in attachments:
            email.attach(name, content, mimetype)
    email.send(fail_silently=True)

# User registration email notification
@receiver(post_save, sender=get_user_model())
def user_registered(sender, instance, created, **kwargs):
    if created:
        try:
            subject = 'Welcome to Hausasoft E-Learn!'
            context = {'name': instance.get_full_name() or instance.email}
            message = render_to_string('emails/welcome.html', context)
            send_notification_email(subject, message, [instance.email], template='emails/welcome.html', context=context)
            # Create notification
            from .models import Notification
            Notification.objects.create(user=instance, message='Welcome to Hausasoft E-Learn!', type='info')
            # Broadcast notification (if channels are set up)
            # from channels.layers import get_channel_layer
            # from asgiref.sync import async_to_sync
            # channel_layer = get_channel_layer()
            # if channel_layer:
            #     async_to_sync(channel_layer.group_send)(
            #         f'user_{instance.id}_notifications',
            #         {
            #             'type': 'send_notification',
            #             'notification': {'message': 'Welcome to Hausasoft E-Learn!', 'type': 'info'}
            #         }
            #     )

        except Exception as e:
            # Log the error but don't prevent registration from succeeding
            import logging
            logger = logging.getLogger(__name__)
            logger.error("Error in user_registered signal handler: %s", e, exc_info=True)

# Enrollment email notification (student)
@receiver(post_save, sender=Enrollment)
def enrollment_created(sender, instance, created, **kwargs):
    if created:
        subject = f'Enrolled in {instance.course.title}'
        context = {'name': instance.student.get_full_name() or instance.student.email, 'course_title': instance.course.title}
        message = render_to_string('emails/enrollment.html', context)
        send_notification_email(subject, message, [instance.student.email], template='emails/enrollment.html', context=context)
        # Notify instructor
        instructor = instance.course.instructor
        subject2 = f'New Student Enrollment in {instance.course.title}'
        context2 = {'instructor_name': instructor.get_full_name() or instructor.email, 'student_name': instance.student.get_full_name() or instance.student.email, 'course_title': instance.course.title}
        message2 = render_to_string('emails/student_enrolled_instructor.html', context2)
        send_notification_email(subject2, message2, [instructor.email], template='emails/student_enrolled_instructor.html', context=context2)
        Notification.objects.create(user=instance.student, message=f'You have been enrolled in {instance.course.title}', type='info')
        broadcast_notification(instance.student.id, instance)

# Notify admins on new course submission
@receiver(post_save, sender=Course)
def new_course_submitted(sender, instance, created, **kwargs):
    if created and instance.status == 'pending':
        from django.contrib.auth import get_user_model
        admin_emails = list(get_user_model().objects.filter(is_superuser=True).values_list('email', flat=True))
        subject = f'New Course Submitted: {instance.title}'
        context = {'course_title': instance.title, 'instructor_name': instance.instructor.get_full_name() or instance.instructor.email}
        message = render_to_string('emails/new_course_submitted.html', context)
        send_notification_email(subject, message, admin_emails, template='emails/new_course_submitted.html', context=context)
        Notification.objects.create(user=instance.instructor, message=f'New course "{instance.title}" has been submitted for approval', type='info')
        broadcast_notification(instance.instructor.id, instance)

# Notify instructor on course approval/rejection
def course_status_changed(sender, instance, **kwargs):
    if not instance.pk:
        return
    try:
        old = sender.objects.get(pk=instance.pk)
    except sender.DoesNotExist:
        return
    if old.status != instance.status:
        if instance.status == 'published':
            subject = f'Your course "{instance.title}" has been approved!'
            context = {'name': instance.instructor.get_full_name() or instance.instructor.email, 'course_title': instance.title}
            message = render_to_string('emails/course_approval.html', context)
            send_notification_email(subject, message, [instance.instructor.email], template='emails/course_approval.html', context=context)
            Notification.objects.create(user=instance.instructor, message=f'Your course "{instance.title}" has been approved!', type='success')
            broadcast_notification(instance.instructor.id, instance)
        elif instance.status == 'rejected':
            subject = f'Your course "{instance.title}" was rejected.'
            context = {'name': instance.instructor.get_full_name() or instance.instructor.email, 'course_title': instance.title}
            message = render_to_string('emails/course_rejection.html', context)
            send_notification_email(subject, message, [instance.instructor.email], template='emails/course_rejection.html', context=context)
            Notification.objects.create(user=instance.instructor, message=f'Your course "{instance.title}" was rejected.', type='error')
            broadcast_notification(instance.instructor.id, instance)

pre_save.connect(course_status_changed, sender=Course)

# Lesson release notification (to enrolled students)
@receiver(post_save, sender=Lesson)
def lesson_released(sender, instance, created, **kwargs):
    if not created and instance.release_date:
        now = timezone.now()
        if instance.release_date <= now:
            enrolled_students = [enr.student for enr in instance.course.enrollments.all()]
            for student in enrolled_students:
                subject = f'New lesson released: {instance.title}'
                context = {'name': student.get_full_name() or student.email, 'lesson_title': instance.title, 'course_title': instance.course.title}
                message = render_to_string('emails/lesson_release.html', context)
                send_notification_email(subject, message, [student.email], template='emails/lesson_release.html', context=context)
                Notification.objects.create(user=student, message=f'New lesson "{instance.title}" has been released in {instance.course.title}', type='info')
                broadcast_notification(student.id, instance)

# Quiz result notification (to student)
@receiver(post_save, sender=QuizAttempt)
def quiz_result_notification(sender, instance, created, **kwargs):
    if created:
        subject = f'Quiz Results for {instance.quiz.lesson.title}'
        context = {'name': instance.user.get_full_name() or instance.user.email, 'score': instance.score, 'lesson_title': instance.quiz.lesson.title, 'course_title': instance.quiz.lesson.course.title}
        message = render_to_string('emails/quiz_result.html', context)
        send_notification_email(subject, message, [instance.user.email], template='emails/quiz_result.html', context=context)
        Notification.objects.create(user=instance.user, message=f'Quiz results for {instance.quiz.lesson.title} in {instance.quiz.lesson.course.title} are out!', type='info')
        broadcast_notification(instance.user.id, instance)

# Payment confirmation notification (to student)
@receiver(post_save, sender=Payment)
def payment_confirmation_notification(sender, instance, created, **kwargs):
    if instance.status == 'paid':
        subject = f'Payment Received for {instance.course.title}'
        context = {'name': instance.user.get_full_name() or instance.user.email, 'course_title': instance.course.title}
        message = render_to_string('emails/payment_confirmation.html', context)
        send_notification_email(subject, message, [instance.user.email], template='emails/payment_confirmation.html', context=context)
        Notification.objects.create(user=instance.user, message=f'Payment received for {instance.course.title}', type='info')
        broadcast_notification(instance.user.id, instance)

# Notify instructor when a student completes their course
@receiver(post_save, sender=Enrollment)
def student_completed_course(sender, instance, **kwargs):
    if instance.completed:
        instructor = instance.course.instructor
        subject = f'Student Completed Your Course: {instance.course.title}'
        context = {'instructor_name': instructor.get_full_name() or instructor.email, 'student_name': instance.student.get_full_name() or instance.student.email, 'course_title': instance.course.title}
        message = render_to_string('emails/course_completed_instructor.html', context)
        send_notification_email(subject, message, [instructor.email], template='emails/course_completed_instructor.html', context=context)
        Notification.objects.create(user=instructor, message=f'Student {instance.student.get_full_name()} has completed {instance.course.title}', type='info')
        broadcast_notification(instructor.id, instance)

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user).order_by('-created_at')

    @action(detail=True, methods=['post'])
    def mark_as_read(self, request, pk=None):
        notification = self.get_object()
        notification.read = True
        notification.save()
        return Response({'status': 'marked as read'})

def broadcast_notification(user_id, notification):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f'user_{user_id}_notifications',
        {
            'type': 'send_notification',
            'notification': NotificationSerializer(notification).data
        }
    )

class SupportTicketViewSet(viewsets.ModelViewSet):
    queryset = SupportTicket.objects.all()
    serializer_class = SupportTicketSerializer
    permission_classes = [permissions.AllowAny]

class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.AllowAny]

class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    permission_classes = [permissions.AllowAny]

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            data = request.data
            required_fields = ['name', 'email', 'password', 'confirmPassword', 'role']
            
            # 1. Check for missing fields
            for field in required_fields:
                if not data.get(field):
                    clean_field_name = field.replace('Password', ' Password')
                    return Response(
                        {'error': f'{clean_field_name.title()} is required.'}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )

            name = data.get('name')
            email = data.get('email')
            password = data.get('password')
            confirm_password = data.get('confirmPassword') # Use correct backend variable name internally
            role = data.get('role')

            # 2. Password policy validation
            password_regex = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$'
            if not re.match(password_regex, password):
                return Response(
                    {'error': 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # 3. Email format validation
            if '@' not in email:
                return Response(
                    {'error': 'Please enter a valid email address.'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            # 4. Password match validation (using internal variable name)
            if password != confirm_password:
                return Response(
                    {'error': 'Passwords do not match.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            User = get_user_model()
            # 5. Check if email already exists
            if User.objects.filter(email=email).exists():
                return Response(
                    {'error': 'This email is already registered. Please use a different email or try logging in.'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            # 6. Validate role
            valid_roles = ['student', 'instructor']
            if role not in valid_roles:
                return Response(
                    {'error': 'Invalid role selected.'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            # If all validations pass, create user
            user = User.objects.create(
                username=email, # Assuming email is used as username
                email=email,
                first_name=name,
                role=role,
                password=make_password(password)
            )

            # Return 201 Created on success
            return Response(
                {'message': 'Registration successful! You can now log in with your email and password.'},
                status=status.HTTP_201_CREATED
            )

        except Exception as e:
            # Catch unexpected server errors and return 500
            import logging
            logger = logging.getLogger(__name__)
            logger.error("Registration error: %s", e, exc_info=True)
            return Response({
                'error': 'An unexpected error occurred. Please try again later.'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_me(request):
    return Response(UserSerializer(request.user).data)

@csrf_exempt
def learn_with_ai(request):
    prompt = request.GET.get("prompt")
    if not prompt:
        return JsonResponse({"error": "No prompt provided."}, status=400)
    result = get_gemini_response(prompt)
    return JsonResponse(result)
