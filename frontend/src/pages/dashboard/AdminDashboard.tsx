import React from 'react';
import { Users, BookOpen, DollarSign, FileText, UserCheck, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { mockCourses } from '../../data/mockCourses';

// Mock data for admin dashboard
const pendingCourses = mockCourses.slice(0, 3).map(course => ({
  ...course,
  submittedAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
}));

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Platform stats
  const totalUsers = 12547;
  const newUsersThisMonth = 436;
  const totalCourses = 287;
  const totalInstructors = 84;
  const totalRevenue = 15680000; // in Naira
  const thisMonthRevenue = 1230000; // in Naira
  
  return (
    <div className="animate-fade-in">
      {/* Welcome Section */}
      <div className="mb-8 rounded-lg bg-gradient-to-r from-primary-600 to-primary-800 p-6 shadow-lg">
        <div className="text-white">
          <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
          <p className="mt-2">Here's what's happening on the platform today.</p>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-primary-500">
          <div className="flex items-center">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
              <Users className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-bold">{totalUsers.toLocaleString()}</p>
              <p className="text-xs text-green-600">+{newUsersThisMonth} this month</p>
            </div>
          </div>
        </Card>
        
        <Card className="border-l-4 border-secondary-500">
          <div className="flex items-center">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary-100">
              <BookOpen className="h-6 w-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Courses</p>
              <p className="text-2xl font-bold">{totalCourses}</p>
              <p className="text-xs text-green-600">+12 this month</p>
            </div>
          </div>
        </Card>
        
        <Card className="border-l-4 border-accent-500">
          <div className="flex items-center">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-100">
              <UserCheck className="h-6 w-6 text-accent-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Instructors</p>
              <p className="text-2xl font-bold">{totalInstructors}</p>
              <p className="text-xs text-green-600">+5 this month</p>
            </div>
          </div>
        </Card>
        
        <Card className="border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold">₦{(totalRevenue / 1000000).toFixed(1)}M</p>
              <p className="text-xs text-green-600">₦{(thisMonthRevenue / 1000000).toFixed(1)}M this month</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Overview Charts */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-semibold">User Growth</h3>
          </div>
          <div className="h-72 p-6">
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500">
                [Sample Chart: User growth over time would be displayed here]
              </p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-semibold">Revenue Overview</h3>
          </div>
          <div className="h-72 p-6">
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500">
                [Sample Chart: Revenue metrics would be displayed here]
              </p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Pending Approvals */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Pending Course Approvals</h2>
          <Link to="/dashboard/admin/courses">
            <Button variant="outline" size="sm">
              View All Courses
            </Button>
          </Link>
        </div>
        
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Course
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Instructor
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Submitted
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {pendingCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-md object-cover"
                            src={course.thumbnail}
                            alt={course.title}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{course.title}</div>
                          <div className="text-sm text-gray-500">
                            Price: {course.isFree ? 'Free' : `₦${course.price.toLocaleString()}`}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <img
                          className="mr-2 h-6 w-6 rounded-full"
                          src={course.instructor.avatar}
                          alt={course.instructor.name}
                        />
                        <div className="text-sm font-medium text-gray-900">
                          {course.instructor.name}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {course.category}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {course.submittedAt.toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800">
                        Pending Review
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-600 hover:text-gray-900"
                          leftIcon={<Eye className="h-4 w-4" />}
                        >
                          Preview
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-600 hover:text-green-900"
                          leftIcon={<CheckCircle className="h-4 w-4" />}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-900"
                          leftIcon={<XCircle className="h-4 w-4" />}
                        >
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Activity</h2>
        </div>
        
        <Card>
          <div className="space-y-4 p-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-start space-x-3 border-b border-gray-100 pb-4 last:border-0">
                <div className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full ${
                  i % 4 === 0
                    ? 'bg-green-100 text-green-600'
                    : i % 4 === 1
                    ? 'bg-blue-100 text-blue-600'
                    : i % 4 === 2
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-purple-100 text-purple-600'
                }`}>
                  {i % 4 === 0 ? (
                    <UserCheck className="h-4 w-4" />
                  ) : i % 4 === 1 ? (
                    <BookOpen className="h-4 w-4" />
                  ) : i % 4 === 2 ? (
                    <DollarSign className="h-4 w-4" />
                  ) : (
                    <FileText className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col justify-between sm:flex-row">
                    <p className="text-sm font-medium">
                      {[
                        'New instructor account created',
                        'New course submitted for review',
                        'Course purchase completed',
                        'New support ticket opened',
                        'User reached 100% completion on a course',
                      ][i]}
                    </p>
                    <p className="text-xs text-gray-500">
                      {['10 minutes ago', '2 hours ago', '6 hours ago', 'Yesterday', '2 days ago'][i]}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {[
                      'Ibrahim Mohammed registered as a new instructor.',
                      'Introduction to Mobile Development submitted by Fatima Hassan.',
                      'Ahmed Yusuf purchased Digital Marketing Masterclass for ₦15,000.',
                      'Technical issue reported with video playback on iOS devices.',
                      'Aisha Bello completed Advanced Web Development course.',
                    ][i]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      {/* Quick Action Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-primary-50">
          <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
              <Users className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">User Management</h3>
            <p className="mb-4 text-sm text-gray-600">
              View, edit and manage user accounts, permissions and roles.
            </p>
            <Link to="/dashboard/admin/users" className="mt-auto">
              <Button variant="primary">Manage Users</Button>
            </Link>
          </div>
        </Card>
        
        <Card className="bg-secondary-50">
          <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary-100">
              <BookOpen className="h-8 w-8 text-secondary-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Course Reviews</h3>
            <p className="mb-4 text-sm text-gray-600">
              Review and moderate course content, instructor submissions and student reviews.
            </p>
            <Link to="/dashboard/admin/courses" className="mt-auto">
              <Button variant="secondary">View Courses</Button>
            </Link>
          </div>
        </Card>
        
        <Card className="bg-accent-50">
          <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-100">
              <Clock className="h-8 w-8 text-accent-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Platform Analytics</h3>
            <p className="mb-4 text-sm text-gray-600">
              View detailed analytics about platform usage, revenue and user engagement.
            </p>
            <Link to="/dashboard/admin/analytics" className="mt-auto">
              <Button variant="accent">View Analytics</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;