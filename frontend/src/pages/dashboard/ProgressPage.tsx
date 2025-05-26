import React from 'react';
import { BarChart2, PieChart, TrendingUp } from 'lucide-react';

const ProgressPage: React.FC = () => {
  // Dummy data
  const totalCourses = 8;
  const completed = 5;
  const inProgress = 3;
  const weeklyActivity = [2, 1, 3, 2, 4, 1, 2]; // hours per day
  const quote = "Keep pushing forward. Every day is progress!";

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Progress Overview</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="rounded-lg bg-green-50 p-6 flex flex-col items-center shadow">
          <BarChart2 className="h-8 w-8 text-green-600 mb-2" />
          <div className="text-3xl font-bold text-green-700">{totalCourses}</div>
          <div className="text-gray-700">Total Courses</div>
        </div>
        <div className="rounded-lg bg-green-50 p-6 flex flex-col items-center shadow">
          <PieChart className="h-8 w-8 text-green-600 mb-2" />
          <div className="text-3xl font-bold text-green-700">{completed}</div>
          <div className="text-gray-700">Completed</div>
        </div>
        <div className="rounded-lg bg-green-50 p-6 flex flex-col items-center shadow">
          <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
          <div className="text-3xl font-bold text-green-700">{inProgress}</div>
          <div className="text-gray-700">In Progress</div>
        </div>
      </div>
      {/* Simple Bar Chart for Weekly Activity */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Weekly Activity</h3>
        <div className="flex items-end gap-2 h-32">
          {weeklyActivity.map((hours, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className="w-6 rounded bg-green-400"
                style={{ height: `${hours * 20}px` }}
                title={`${hours} hour${hours !== 1 ? 's' : ''}`}
              ></div>
              <span className="text-xs text-gray-500 mt-1">{['S','M','T','W','T','F','S'][i]}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Motivational Quote */}
      <div className="rounded-lg bg-green-100 p-6 text-center text-green-800 font-semibold shadow">
        “{quote}”
      </div>
    </div>
  );
};

export default ProgressPage; 