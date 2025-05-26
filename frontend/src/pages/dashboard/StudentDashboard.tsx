import React from 'react';
import { Book, Clock, Award, BarChart2, Calendar, CheckCircle } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { mockCourses } from '../../data/mockCourses';

// Get a subset of courses as enrolled courses
const enrolledCourses = mockCourses.slice(0, 4).map(course => ({
  ...course,
  progress: Math.floor(Math.random() * 100),
  lastAccessed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
}));

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="animate-fade-in">
      {/* Welcome Section */}
      <div className="mb-8 rounded-lg bg-gradient-to-r from-primary-600 to-primary-800 p-6 shadow-lg">
        <div className="text-white">
          <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
          <p className="mt-2">Continue your learning journey where you left off.</p>
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
              <p className="text-sm font-medium text-gray-500">Enrolled Courses</p>
              <p className="text-2xl font-bold">{enrolledCourses.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="border-l-4 border-secondary-500">
          <div className="flex items-center">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary-100">
              <Clock className="h-6 w-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Hours Learned</p>
              <p className="text-2xl font-bold">24.5</p>
            </div>
          </div>
        </Card>
        
        <Card className="border-l-4 border-accent-500">
          <div className="flex items-center">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-100">
              <Award className="h-6 w-6 text-accent-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Certificates</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </Card>
        
        <Card className="border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <BarChart2 className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Progress</p>
              <p className="text-2xl font-bold">
                {Math.round(
                  enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length
                )}%
              </p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Continue Learning Section */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Continue Learning</h2>
          <Link to="/courses" className="text-sm font-medium text-primary-600 hover:text-primary-700">
            View All Courses
          </Link>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2">
          {enrolledCourses
            .sort((a, b) => b.lastAccessed.getTime() - a.lastAccessed.getTime())
            .slice(0, 2)
            .map((course) => (
              <Card key={course.id} className="flex overflow-hidden">
                <div className="w-1/3">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex w-2/3 flex-col justify-between p-4">
                  <div>
                    <h3 className="mb-1 text-lg font-semibold line-clamp-1">{course.title}</h3>
                    <p className="mb-2 text-sm text-gray-600">
                      Last accessed: {course.lastAccessed.toLocaleDateString()}
                    </p>
                    <div className="mb-2 h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-primary-500"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600">{course.progress}% complete</p>
                  </div>
                  <div className="mt-4">
                    <Link to={`/learning/${course.id}`}>
                      <Button variant="primary" size="sm">
                        Continue
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </div>
      
      {/* My Courses Section */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">My Courses</h2>
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
                    Progress
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Last Accessed
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {enrolledCourses.map((course) => (
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
                      <div className="text-sm text-gray-900">{course.instructor.name}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="mr-2 h-2 w-16 rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-primary-500"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">{course.progress}%</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {course.lastAccessed.toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <Link
                        to={`/learning/${course.id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        Continue
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Upcoming Deadlines */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-bold">Upcoming Deadlines</h2>
          <Card>
            <div className="space-y-4">
              <div className="flex items-start justify-between border-l-4 border-yellow-500 bg-yellow-50 p-3">
                <div className="flex items-start">
                  <Calendar className="mr-3 h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium">Assignment due in 2 days</p>
                    <p className="text-sm text-gray-600">Web Development Basics</p>
                  </div>
                </div>
                <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                  Sep 15
                </span>
              </div>
              
              <div className="flex items-start justify-between border-l-4 border-red-500 bg-red-50 p-3">
                <div className="flex items-start">
                  <Calendar className="mr-3 h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-medium">Quiz due tomorrow</p>
                    <p className="text-sm text-gray-600">Mobile App Development</p>
                  </div>
                </div>
                <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                  Sep 12
                </span>
              </div>
              
              <div className="flex items-start justify-between border-l-4 border-green-500 bg-green-50 p-3">
                <div className="flex items-start">
                  <Calendar className="mr-3 h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Final project submission</p>
                    <p className="text-sm text-gray-600">Data Science Fundamentals</p>
                  </div>
                </div>
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  Sep 30
                </span>
              </div>
            </div>
          </Card>
        </div>
        
        <div>
          <h2 className="mb-4 text-xl font-bold">Achievements</h2>
          <Card>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                  <Award className="h-8 w-8 text-primary-600" />
                </div>
                <p className="text-sm font-medium">Fast Learner</p>
                <p className="text-xs text-gray-500">Completed 3 lessons in a day</p>
              </div>
              
              <div className="flex flex-col items-center justify-center text-center">
                <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-secondary-100">
                  <CheckCircle className="h-8 w-8 text-secondary-600" />
                </div>
                <p className="text-sm font-medium">Perfect Score</p>
                <p className="text-xs text-gray-500">Scored 100% on a quiz</p>
              </div>
              
              <div className="flex flex-col items-center justify-center text-center opacity-50">
                <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <Award className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-sm font-medium">Course Master</p>
                <p className="text-xs text-gray-500">Complete a full course</p>
              </div>
            </div>
            
            <div className="mt-4 rounded-md bg-primary-50 p-3 text-center text-sm text-primary-700">
              Complete more courses to unlock additional achievements!
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;