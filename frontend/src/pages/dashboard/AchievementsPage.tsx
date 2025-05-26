import React, { useState } from 'react';
import { Award, Info } from 'lucide-react';

const achievements = [
  {
    id: 1,
    title: 'Completed 5 Courses',
    date: '2024-05-01',
    description: 'Awarded for completing 5 courses on the platform.',
  },
  {
    id: 2,
    title: 'First Course Completed',
    date: '2024-04-15',
    description: 'Congratulations on completing your first course!',
  },
  {
    id: 3,
    title: 'Learning Streak: 7 Days',
    date: '2024-05-10',
    description: 'You studied for 7 days in a row. Keep it up!',
  },
];

const AchievementsPage: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((ach) => (
          <div key={ach.id} className="relative rounded-lg border border-gray-200 bg-white p-6 shadow hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-2">
              <Award className="h-8 w-8 text-green-600" />
              <div>
                <div className="font-semibold text-green-700 text-base">{ach.title}</div>
                <div className="text-xs text-gray-500">{new Date(ach.date).toLocaleDateString()}</div>
              </div>
              <button
                className="ml-auto p-1 rounded-full hover:bg-green-50"
                onClick={() => setActive(active === ach.id ? null : ach.id)}
                title="More info"
              >
                <Info className="h-5 w-5 text-green-500" />
              </button>
            </div>
            {active === ach.id && (
              <div className="absolute top-16 left-0 right-0 z-10 rounded-lg bg-green-50 p-4 text-green-900 shadow-lg border border-green-200 animate-fade-in">
                {ach.description}
              </div>
            )}
          </div>
        ))}
        {achievements.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-12">No achievements yet.</div>
        )}
      </div>
    </div>
  );
};

export default AchievementsPage; 