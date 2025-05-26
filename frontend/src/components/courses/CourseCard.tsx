import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star } from 'lucide-react';
import Card from '../common/Card';
import { Course } from '../../types/course';
import { useLanguage } from '../../hooks/useLanguage';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { t } = useLanguage();
  
  return (
    <Link to={`/courses/${course.id}`}>
      <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg">
        {/* Thumbnail */}
        <div className="relative -mx-6 -mt-6 mb-4 h-48 overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {course.isFree && (
            <span className="absolute left-4 top-4 rounded-full bg-accent-500 px-3 py-1 text-xs font-medium text-white">
              Free
            </span>
          )}
        </div>
        
        {/* Content */}
        <div>
          {/* Category */}
          <div className="mb-2">
            <span className="inline-block rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">
              {course.category}
            </span>
            <span className="ml-2 inline-block rounded-full bg-secondary-100 px-2.5 py-0.5 text-xs font-medium text-secondary-800">
              {course.level}
            </span>
          </div>
          
          {/* Title */}
          <h3 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-2">
            {course.title}
          </h3>
          
          {/* Description */}
          <p className="mb-4 text-sm text-gray-600 line-clamp-2">
            {course.description}
          </p>
          
          {/* Course Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-1 h-4 w-4" />
                <span>{course.studentsCount}</span>
              </div>
            </div>
            <div className="flex items-center">
              <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{course.rating.toFixed(1)}</span>
            </div>
          </div>
          
          {/* Instructor & Price */}
          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="flex items-center">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="mr-2 h-8 w-8 rounded-full object-cover"
              />
              <span className="text-xs text-gray-500">
                {course.instructor.name}
              </span>
            </div>
            <div>
              {course.isFree ? (
                <span className="font-semibold text-primary-600">Free</span>
              ) : (
                <span className="font-semibold text-primary-600">₦{course.price.toLocaleString()}</span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CourseCard;