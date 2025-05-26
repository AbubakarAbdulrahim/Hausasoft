import React, { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import {
  BookOpen,
  BarChart2,
  Users,
  Settings,
  FileText,
  PlusCircle,
  LogOut,
  User,
  LayoutDashboard,
  Menu,
  X,
  ChevronRight,
  Bell,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Determine navigation items based on user role
  const getNavigationItems = () => {
    if (user.role === 'student') {
      return [
        {
          name: t('dashboard.student.title'),
          href: '/dashboard/student',
          icon: <LayoutDashboard className="h-5 w-5" />,
        },
        {
          name: t('dashboard.courses'),
          href: '/dashboard/student/courses',
          icon: <BookOpen className="h-5 w-5" />,
        },
        {
          name: t('dashboard.progress'),
          href: '/dashboard/student/progress',
          icon: <BarChart2 className="h-5 w-5" />,
        },
        {
          name: t('dashboard.achievements'),
          href: '/dashboard/student/achievements',
          icon: <FileText className="h-5 w-5" />,
        },
      ];
    } else if (user.role === 'instructor') {
      return [
        {
          name: t('dashboard.instructor.title'),
          href: '/dashboard/instructor',
          icon: <LayoutDashboard className="h-5 w-5" />,
        },
        {
          name: t('dashboard.courses'),
          href: '/dashboard/instructor/courses',
          icon: <BookOpen className="h-5 w-5" />,
        },
        {
          name: 'Create Course',
          href: '/dashboard/instructor/create-course',
          icon: <PlusCircle className="h-5 w-5" />,
        },
        {
          name: 'Students',
          href: '/dashboard/instructor/students',
          icon: <Users className="h-5 w-5" />,
        },
        {
          name: t('dashboard.analytics'),
          href: '/dashboard/instructor/analytics',
          icon: <BarChart2 className="h-5 w-5" />,
        },
      ];
    } else if (user.role === 'admin') {
      return [
        {
          name: t('dashboard.admin.title'),
          href: '/dashboard/admin',
          icon: <LayoutDashboard className="h-5 w-5" />,
        },
        {
          name: 'Courses',
          href: '/dashboard/admin/courses',
          icon: <BookOpen className="h-5 w-5" />,
        },
        {
          name: 'Users',
          href: '/dashboard/admin/users',
          icon: <Users className="h-5 w-5" />,
        },
        {
          name: t('dashboard.analytics'),
          href: '/dashboard/admin/analytics',
          icon: <BarChart2 className="h-5 w-5" />,
        },
        {
          name: 'Settings',
          href: '/dashboard/admin/settings',
          icon: <Settings className="h-5 w-5" />,
        },
      ];
    }
    return [];
  };

  // Add new dashboard links for My Courses, Progress, Achievements
  const extraStudentNav = [
    {
      name: 'My Courses',
      href: '/dashboard/courses',
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      name: 'Progress',
      href: '/dashboard/progress',
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      name: 'Achievements',
      href: '/dashboard/achievements',
      icon: <FileText className="h-5 w-5" />,
    },
  ];
  // Merge with existing student nav
  const navigationItems = user.role === 'student'
    ? [...getNavigationItems(), ...extraStudentNav]
    : getNavigationItems();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar Backdrop (Mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 h-full transform overflow-y-auto bg-white transition-all duration-200 ease-in-out flex flex-col ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isSidebarExpanded ? 'w-64 px-4' : 'w-20 px-2'} lg:static lg:inset-0 lg:translate-x-0`}
        onMouseEnter={() => setIsSidebarExpanded(true)}
        onMouseLeave={() => setIsSidebarExpanded(false)}
      >
        {/* Branding */}
        <div className="flex h-16 items-center justify-between pt-4 overflow-hidden">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/img/logo_black.png"
              alt="Hausasoft Logo"
              className={`object-contain transition-all duration-200 ${isSidebarExpanded ? 'h-10 w-auto opacity-100' : 'h-0 w-0 opacity-0'} max-w-full`}
              style={{ minWidth: 0, minHeight: 0 }}
            />
          </Link>
          <button
            onClick={toggleSidebar}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-8 space-y-1 flex-1">
          {(user.role === 'student' ? navigationItems.slice(0, -3) : navigationItems).map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`group flex items-center rounded-lg px-3 py-2 my-1 text-sm font-medium transition-all duration-200 ${
                isActive(item.href)
                  ? 'bg-green-100 text-green-700 shadow'
                  : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
              }`}
            >
              <div
                className={`flex-shrink-0 transition-all duration-200 ${
                  isActive(item.href) ? 'text-green-700' : 'text-gray-400 group-hover:text-green-700'
                }`}
              >
                {item.icon}
              </div>
              {isSidebarExpanded && (
                <span className="ml-3 transition-all duration-200">{item.name}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="mt-auto border-t border-gray-200 pt-4">
          <div className={`flex items-center px-3 py-2 rounded-lg bg-green-100 ${isSidebarExpanded ? '' : 'justify-center'} transition-all duration-200`}>
            <Link to="/dashboard/profile" className="mr-3 h-10 w-10 overflow-hidden rounded-full border-2 border-white">
              <img
                src={user.avatar || 'https://i.pravatar.cc/150'}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            </Link>
            {isSidebarExpanded && (
            <div>
                <p className="text-sm font-medium text-green-700">{user.name}</p>
                <p className="text-xs text-green-600">{user.email}</p>
            </div>
            )}
          </div>

          <div className="mt-2 space-y-1">
            <Link
              to="/dashboard/profile"
              className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                isSidebarExpanded ? 'text-gray-700 hover:bg-green-50 hover:text-green-700' : 'justify-center text-gray-700 hover:bg-green-50 hover:text-green-700'
              }`}
            >
              <User className="mr-3 h-5 w-5 text-gray-700 group-hover:text-green-700" />
              {isSidebarExpanded && 'Profile'}
            </Link>
            <button
              onClick={logout}
              className={`group flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                isSidebarExpanded ? 'text-gray-700 hover:bg-green-50 hover:text-green-700' : 'justify-center text-gray-700 hover:bg-green-50 hover:text-green-700'
              }`}
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-700 group-hover:text-green-700" />
              {isSidebarExpanded && t('nav.logout')}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
        {/* Top Header */}
        <header className="border-b border-gray-200 bg-white px-4 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="rounded-md p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="ml-4 flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  {user.role === 'student'
                    ? t('dashboard.student.title')
                    : user.role === 'instructor'
                    ? t('dashboard.instructor.title')
                    : t('dashboard.admin.title')}
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  3
                </span>
              </button>
            </div>
          </div>
          
          {/* Breadcrumbs */}
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <Link to="/dashboard" className="hover:text-primary-600">
              Dashboard
            </Link>
            <ChevronRight className="mx-1 h-4 w-4" />
            <span className="text-gray-700">
              {user.role === 'student'
                ? 'Student Dashboard'
                : user.role === 'instructor'
                ? 'Instructor Dashboard'
                : 'Admin Dashboard'}
            </span>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;