import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import LearningPage from './pages/LearningPage';
import DashboardLayout from './layouts/DashboardLayout';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import InstructorDashboard from './pages/dashboard/InstructorDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import { useAuth } from './hooks/useAuth';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import { MyCoursesPage, ProgressPage, AchievementsPage } from './pages/dashboard';
import LearnWithAIPage from './pages/LearnWithAIPage';
import SupportPage from './pages/SupportPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import Modal from './components/common/Modal';

function App() {
  const { loading } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/:courseId" element={<CourseDetailsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="ai" element={
          <ProtectedRoute roles={['student', 'instructor', 'admin']}>
            <LearnWithAIPage />
          </ProtectedRoute>
        } />
        <Route path="support" element={
          <ProtectedRoute roles={['student', 'instructor', 'admin']}>
            <SupportPage />
          </ProtectedRoute>
        } />
      </Route>

      {/* Protected learning route */}
      <Route
        path="/learning/:courseId/*"
        element={
          <ProtectedRoute roles={['student', 'instructor', 'admin']}>
            <LearningPage />
          </ProtectedRoute>
        }
      />

      {/* Dashboard routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute roles={['student', 'instructor', 'admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="student"
          element={
            <ProtectedRoute roles={['student', 'admin']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="instructor"
          element={
            <ProtectedRoute roles={['instructor', 'admin']}>
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin"
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="courses" element={<MyCoursesPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="achievements" element={<AchievementsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* 404 page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;