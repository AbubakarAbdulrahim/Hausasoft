import React from 'react';
import { Book, Users, DollarSign, Award, BarChart2, ChevronRight, Edit, Eye, Trash2 } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { mockCourses } from '../../data/mockCourses';

// Get a subset of courses as instructor's courses
const instructorCourses = mockCourses.slice(0, 5).map(course => ({
  ...course,
  status: ['published', 'draft', 'review', 'published', 'published'][
    mockCourses.indexOf(course) % 5
  ],
  studentsLast30Days: Math.floor(Math.random() * 100),
  earnings: course.isFree ? 0 : Math.floor(Math.random() * 1000) * 100,
}));

const InstructorDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Calculate totals
  const totalStudents = instructorCourses.reduce((sum, course) => sum + course.studentsCount, 0);
  const totalEarnings = instructorCourses.reduce((sum, course) => sum + course.earnings, 0);
  const totalCourses = instructorCourses.length;
  const publishedCourses = instructorCourses.filter(course => course.status === 'published').length;
  
  return (
    <div className="animate-fade-in">
      {/* Welcome Section */}
      <div className="mb-8 rounded-lg bg-gradient-to-r from-primary-600 to-primary-800 p-6 shadow-lg">
        <div className="flex flex-col gap-4 text-white md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
            <p className="mt-2">Manage your courses and check your performance.</p>
          </div>
          <div>
            <Link to="/dashboard/instructor/create-course">
              <Button
                variant="accent"
                size="lg"
                className="w-full md:w-auto"
              >
                Create New Course
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-primary-500">
          <div className="flex items-center">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
              <Book className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Courses</p>
              <p className="text-2xl font-bold">{totalCourses}</p>
            </div>
          </div>
        </Card>
        
        <Card className="border-l-4 border-secondary-500">
          <div className="flex items-center">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary-100">
              <Users className="h-6 w-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Students</p>
              <p className="text-2xl font-bold">{totalStudents}</p>
            </div>
          </div>
        </Card>
        
        <Card className="border-l-4 border-accent-500">
          <div className="flex items-center">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-100">
              <DollarSign className="h-6 w-6 text-accent-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Earnings</p>
              <p className="text-2xl font-bold">₦{totalEarnings.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        
        <Card className="border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Published Courses</p>
              <p className="text-2xl font-bold">{publishedCourses}</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Recent Earnings Chart */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Earnings</h2>
          <select className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
        
        <Card>
          <div className="h-72 p-4">
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500">
                [Sample Chart: Earnings over time would be displayed here]
              </p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Top Courses and Student Growth */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-bold">Top Performing Courses</h2>
          <Card>
            <div className="space-y-4">
              {instructorCourses
                .sort((a, b) => b.studentsCount - a.studentsCount)
                .slice(0, 3)
                .map((course) => (
                  <div key={course.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0">
                    <div className="flex items-center">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="mr-3 h-12 w-12 rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium">{course.title}</p>
                        <p className="text-sm text-gray-600">{course.category}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="font-semibold">{course.studentsCount} students</p>
                      <p className="text-sm text-green-600">
                        +{course.studentsLast30Days} last 30 days
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-4 border-t border-gray-100 pt-4 text-center">
              <Link
                to="/dashboard/instructor/courses"
                className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                View all courses
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </Card>
        </div>
        
        <div>
          <h2 className="mb-4 text-xl font-bold">Student Engagement</h2>
          <Card>
            <div className="h-64 p-4">
              <div className="flex h-full items-center justify-center">
                <p className="text-gray-500">
                  [Sample Chart: Student engagement metrics would be displayed here]
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 border-t border-gray-100 p-4 text-center">
              <div>
                <p className="text-sm text-gray-500">Completion Rate</p>
                <p className="text-lg font-semibold">68%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg. Rating</p>
                <p className="text-lg font-semibold">4.7</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Reviews</p>
                <p className="text-lg font-semibold">243</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      {/* My Courses Section */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">My Courses</h2>
          <Link to="/dashboard/instructor/courses">
            <Button variant="outline" size="sm">
              Manage All Courses
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
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Students
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Earnings
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {instructorCourses.map((course) => (
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
                          <div className="text-sm text-gray-500">{course.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        course.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : course.status === 'draft'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {course.studentsCount}
                      <span className="ml-1 text-xs text-green-600">
                        (+{course.studentsLast30Days})
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {course.isFree
                        ? <span className="text-gray-500">Free</span>
                        : `₦${course.earnings.toLocaleString()}`}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-gray-600 hover:text-gray-900">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Recent Reviews */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Reviews</h2>
          <Link to="/dashboard/instructor/reviews" className="text-sm font-medium text-primary-600 hover:text-primary-700">
            View all reviews
          </Link>
        </div>
        
        <Card>
          <div className="space-y-6">
            {[1, 2, 3].map((review) => (
              <div key={review} className="border-b border-gray-100 pb-6 last:border-0">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={`https://i.pravatar.cc/150?img=${review + 10}`}
                      alt="Student"
                      className="mr-3 h-10 w-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{['Ahmed Musa', 'Fatima Hassan', 'Ibrahim Danjuma'][review - 1]}</p>
                      <p className="text-sm text-gray-600">
                        on{' '}
                        <Link to={`/courses/${instructorCourses[review - 1].id}`} className="text-primary-600 hover:underline">
                          {instructorCourses[review - 1].title}
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <BarChart2 key={i} className={`h-4 w-4 ${i < 5 - review % 2 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">
                  {[
                    'The course content was excellent and well-structured. I learned a lot and would recommend it to others.',
                    'Great course! The instructor explains concepts clearly and the practical examples were very helpful.',
                    'Very informative and practical. The Hausa translation made it much easier for me to understand complex topics.',
                  ][review - 1]}
                </p>
                <div className="mt-2 text-sm text-gray-500">
                  {['3 days ago', '1 week ago', '2 weeks ago'][review - 1]}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InstructorDashboard;