import React, { useState } from 'react';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';
import Button from '../../components/common/Button';

// Dummy data for demonstration
const courses = [
  {
    id: 1,
    title: 'React for Beginners',
    description: 'Learn the basics of React and build interactive UIs.',
    category: 'Web Development',
    completed: false,
    progress: 60,
  },
  {
    id: 2,
    title: 'Advanced CSS',
    description: 'Master advanced CSS techniques for modern web design.',
    category: 'Design',
    completed: true,
    progress: 100,
  },
  {
    id: 3,
    title: 'Python Fundamentals',
    description: 'Get started with Python programming from scratch.',
    category: 'Programming',
    completed: false,
    progress: 30,
  },
];

const categories = ['All', ...Array.from(new Set(courses.map(c => c.category)))];
const statusOptions = ['All', 'Completed', 'In Progress'];

const MyCoursesPage: React.FC = () => {
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');

  const filtered = courses.filter(course => {
    const catMatch = category === 'All' || course.category === category;
    const statusMatch =
      status === 'All' ||
      (status === 'Completed' && course.completed) ||
      (status === 'In Progress' && !course.completed);
    return catMatch && statusMatch;
  });

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
        <div className="flex gap-2">
          <select
            className="rounded border border-gray-300 px-3 py-1 text-sm focus:border-green-600 focus:ring-green-600"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <select
            className="rounded border border-gray-300 px-3 py-1 text-sm focus:border-green-600 focus:ring-green-600"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            {statusOptions.map(opt => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(course => (
          <div key={course.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow hover:shadow-lg transition">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-700 text-sm">{course.category}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{course.title}</h3>
            <p className="text-gray-600 mb-4 text-sm">{course.description}</p>
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-500">Progress</span>
                <span className="text-gray-700 font-medium">{course.progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${course.completed ? 'bg-green-500' : 'bg-green-400'}`}
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
            <Button
              variant={course.completed ? 'outline' : 'primary'}
              size="sm"
              className="w-full"
            >
              {course.completed ? (
                <>
                  <CheckCircle className="inline h-4 w-4 mr-1 text-green-600" /> View
                </>
              ) : (
                <>
                  <Clock className="inline h-4 w-4 mr-1 text-green-600" /> Continue
                </>
              )}
            </Button>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-12">No courses found.</div>
        )}
      </div>
    </div>
  );
};

export default MyCoursesPage; 