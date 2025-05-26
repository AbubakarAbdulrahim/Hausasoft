import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center animate-fade-in">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary-100">
        <AlertTriangle className="h-12 w-12 text-primary-600" />
      </div>
      
      <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">404</h1>
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">Page Not Found</h2>
      <p className="mb-8 max-w-md text-gray-600">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Link to="/">
          <Button
            variant="primary"
            size="lg"
            leftIcon={<Home className="h-5 w-5" />}
          >
            Go to Homepage
          </Button>
        </Link>
        <button onClick={() => window.history.back()}>
          <Button
            variant="outline"
            size="lg"
            leftIcon={<ArrowLeft className="h-5 w-5" />}
          >
            Go Back
          </Button>
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;