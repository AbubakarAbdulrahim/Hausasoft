from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, CourseViewSet, EnrollmentViewSet, ProgressViewSet, AchievementViewSet, LessonViewSet, QuizViewSet, QuestionViewSet, OptionViewSet, QuizAttemptViewSet, PaymentViewSet, CertificateViewSet, payment_webhook, NotificationViewSet, SupportTicketViewSet, ServiceViewSet, TeamMemberViewSet, RegisterView, user_me, learn_with_ai
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'enrollments', EnrollmentViewSet)
router.register(r'progress', ProgressViewSet)
router.register(r'achievements', AchievementViewSet)
router.register(r'lessons', LessonViewSet)
router.register(r'quizzes', QuizViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'options', OptionViewSet)
router.register(r'quiz-attempts', QuizAttemptViewSet)
router.register(r'payments', PaymentViewSet)
router.register(r'certificates', CertificateViewSet)
router.register(r'notifications', NotificationViewSet)
router.register(r'support-tickets', SupportTicketViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'team', TeamMemberViewSet)

urlpatterns = [
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('users/me/', user_me, name='user_me'),
    path('', include(router.urls)),
    path('payments/webhook/', payment_webhook, name='payment_webhook'),
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('auth/social/', include('allauth.socialaccount.urls')),
    path("learn-with-ai/", learn_with_ai, name="learn_with_ai"),
] 