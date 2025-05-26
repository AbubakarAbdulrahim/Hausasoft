import React from 'react';
import { Briefcase } from 'lucide-react';
import services from '../data/services';

const ServicesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-primary-700">Our Services</h1>
      <p className="mb-8 text-lg text-gray-700 max-w-2xl">
        Hausasoft Technologies offers a range of services to help you and your organization thrive in the digital age. Explore our offerings below.
      </p>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {services.map(service => (
          <div key={service.id} className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
            <Briefcase className="h-10 w-10 text-primary-500 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
            <p className="text-gray-600 mb-2">{service.description}</p>
            <ul className="text-sm text-gray-500 list-disc list-inside">
              {service.features.map((feature: string, idx: number) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage; 