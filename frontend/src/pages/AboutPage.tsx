import React from 'react';
import { Users } from 'lucide-react';
import team from '../data/team';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-primary-700">About Hausasoft Technologies</h1>
      <p className="mb-8 text-lg text-gray-700 max-w-2xl">
        Hausasoft Technologies is dedicated to empowering Africa with digital skills. Our mission is to make high-quality tech education accessible to everyone, especially Hausa-speaking communities. We believe in the power of technology to transform lives and drive economic growth across the continent.
      </p>
      <h2 className="text-2xl font-semibold mb-4 mt-10 flex items-center gap-2"><Users className="h-6 w-6 text-primary-500" /> Meet Our Team</h2>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {team.map(member => (
          <div key={member.id} className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
            <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full mb-4 object-cover" />
            <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
            <p className="text-primary-600 font-medium">{member.role}</p>
            <p className="text-gray-500 text-sm mt-2">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage; 