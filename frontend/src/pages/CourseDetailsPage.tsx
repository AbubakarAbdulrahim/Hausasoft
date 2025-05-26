import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Clock,
  Users,
  Star,
  Book,
  Award,
  CheckCircle,
  Play,
  User,
  Calendar,
  Languages,
  Share2,
  BookmarkPlus
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { mockCourses } from '../data/mockCourses';
import { Course } from '../types/course';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';

const CourseDetailsPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'instructor' | 'reviews'>('overview');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Find course from mock data
    const foundCourse = mockCourses.find(c => c.id === courseId);
    
    if (foundCourse) {
      setCourse(foundCourse);
      // Check if user is enrolled (simulated)
      setIsEnrolled(Math.random() > 0.7);
    }
  }, [courseId]);
  
  const handleEnroll = () => {
    if (!user) {
      // Redirect to login if not logged in
      navigate('/login', { state: { from: `/courses/${courseId}` } });
      return;
    }
    
    setLoading(true);
    
    // Simulate enrollment process
    setTimeout(() => {
      setIsEnrolled(true);
      setLoading(false);
    }, 1500);
  };
  
  const startLearning = () => {
    navigate(`/learning/${courseId}`);
  };
  
  if (!course) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Course Info */}
            <div className="lg:w-2/3">
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-primary-500/30 px-3 py-1 text-xs font-medium">
                  {course.category}
                </span>
                <span className="rounded-full bg-primary-500/30 px-3 py-1 text-xs font-medium">
                  {course.level}
                </span>
                {course.isFree && (
                  <span className="rounded-full bg-accent-500 px-3 py-1 text-xs font-medium text-white">
                    Free
                  </span>
                )}
              </div>
              
              <h1 className="mb-4 text-3xl font-bold sm:text-4xl">{course.title}</h1>
              
              <p className="mb-6 text-lg text-primary-100">
                {course.description}
              </p>
              
              <div className="mb-6 flex flex-wrap gap-6">
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-primary-300" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary-300" />
                  <span>{course.studentsCount} students</span>
                </div>
                <div className="flex items-center">
                  <Languages className="mr-2 h-5 w-5 text-primary-300" />
                  <span>English, Hausa</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary-300" />
                  <span>Last updated {new Date(course.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="mb-6 flex items-center">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="mr-3 h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">Created by</p>
                  <p className="text-primary-200">{course.instructor.name}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {isEnrolled ? (
                  <Button
                    variant="accent"
                    size="lg"
                    leftIcon={<Play className="h-5 w-5" />}
                    onClick={startLearning}
                  >
                    {t('course.continue')}
                  </Button>
                ) : (
                  <Button
                    variant="accent"
                    size="lg"
                    isLoading={loading}
                    onClick={handleEnroll}
                  >
                    {t('course.enroll')}
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 bg-transparent text-white hover:bg-white hover:text-primary-700"
                  leftIcon={<BookmarkPlus className="h-5 w-5" />}
                >
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 bg-transparent text-white hover:bg-white hover:text-primary-700"
                  leftIcon={<Share2 className="h-5 w-5" />}
                >
                  Share
                </Button>
              </div>
            </div>
            
            {/* Preview Card */}
            <div className="lg:w-1/3">
              <Card className="overflow-hidden border-0 shadow-xl">
                <div className="relative h-48 w-full">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <button className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-white transition-transform hover:scale-110">
                      <Play className="h-8 w-8 pl-1" fill="white" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6 border-b border-gray-200 pb-4">
                    <div className="mb-2 flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-primary-600">
                        {course.isFree ? 'Free' : `₦${course.price.toLocaleString()}`}
                      </span>
                      {!course.isFree && (
                        <span className="text-sm text-gray-500 line-through">
                          ₦{(course.price * 1.4).toLocaleString()}
                        </span>
                      )}
                    </div>
                    {!course.isFree && (
                      <div className="mb-2 text-sm text-gray-600">
                        <span className="font-medium text-accent-600">40% off</span>
                        <span> · 3 days left at this price!</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Book className="mr-3 h-5 w-5 text-gray-600" />
                      <div>
                        <p className="font-medium">10 modules</p>
                        <p className="text-sm text-gray-600">
                          Comprehensive curriculum
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="mr-3 h-5 w-5 text-gray-600" />
                      <div>
                        <p className="font-medium">Self-paced</p>
                        <p className="text-sm text-gray-600">
                          Learn at your own schedule
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Award className="mr-3 h-5 w-5 text-gray-600" />
                      <div>
                        <p className="font-medium">Certificate</p>
                        <p className="text-sm text-gray-600">
                          Get certified upon completion
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Users className="mr-3 h-5 w-5 text-gray-600" />
                      <div>
                        <p className="font-medium">Community access</p>
                        <p className="text-sm text-gray-600">
                          Connect with fellow learners
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Content */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          {/* Tabs */}
          <div className="mb-8 border-b border-gray-200">
            <div className="flex gap-1 overflow-x-auto">
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-primary-500 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'curriculum'
                    ? 'border-b-2 border-primary-500 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('curriculum')}
              >
                Curriculum
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'instructor'
                    ? 'border-b-2 border-primary-500 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('instructor')}
              >
                Instructor
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-primary-500 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="mb-12">
            {activeTab === 'overview' && (
              <div className="animate-fade-in">
                <div className="prose max-w-none">
                  <h2>About This Course</h2>
                  <p>
                    {course.description} This comprehensive course will take you from beginner to advanced
                    level in {course.category}. Perfect for aspiring professionals who want to
                    build real-world skills and enhance their career prospects.
                  </p>
                  
                  <h3>What You'll Learn</h3>
                  <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-primary-500" />
                      <span>Master the fundamental concepts of {course.category}</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-primary-500" />
                      <span>Build real-world projects for your portfolio</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-primary-500" />
                      <span>Understand industry best practices and workflows</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-primary-500" />
                      <span>Learn problem-solving techniques used by professionals</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-primary-500" />
                      <span>Prepare for technical interviews and assessments</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-primary-500" />
                      <span>Access to valuable resources and learning materials</span>
                    </li>
                  </ul>
                  
                  <h3>Requirements</h3>
                  <ul>
                    <li>Basic computer knowledge</li>
                    <li>Internet connection for streaming video content</li>
                    <li>Dedication and willingness to practice</li>
                    <li>No prior experience in {course.category} needed</li>
                  </ul>
                  
                  <h3>Who This Course is For</h3>
                  <ul>
                    <li>Beginners with no prior knowledge of {course.category}</li>
                    <li>Intermediate learners looking to fill knowledge gaps</li>
                    <li>Professionals wanting to update their skills</li>
                    <li>Students preparing for a career in tech</li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'curriculum' && (
              <div className="animate-fade-in">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Course Content</h2>
                  <div className="text-sm text-gray-600">
                    10 modules • 45 lectures • {course.duration} total
                  </div>
                </div>
                
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, moduleIndex) => (
                    <div key={moduleIndex} className="overflow-hidden rounded-md border border-gray-200">
                      <div className="flex cursor-pointer items-center justify-between bg-gray-50 px-4 py-3">
                        <div className="font-medium">
                          Module {moduleIndex + 1}: {['Introduction', 'Fundamentals', 'Advanced Concepts', 'Practical Applications', 'Projects'][moduleIndex]}
                        </div>
                        <div className="text-sm text-gray-600">3 lectures • 45min</div>
                      </div>
                      
                      <div className="divide-y divide-gray-100 border-t border-gray-200">
                        {Array.from({ length: 3 }).map((_, lectureIndex) => (
                          <div key={lectureIndex} className="flex items-center justify-between px-4 py-3">
                            <div className="flex items-center">
                              <Play className="mr-3 h-4 w-4 text-gray-400" />
                              <span>Lecture {lectureIndex + 1}: Example Topic</span>
                            </div>
                            <div className="text-sm text-gray-600">15:00</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'instructor' && (
              <div className="animate-fade-in">
                <div className="flex flex-col gap-6 sm:flex-row">
                  <div className="sm:w-1/4">
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="h-48 w-full rounded-lg object-cover sm:h-auto"
                    />
                  </div>
                  
                  <div className="sm:w-3/4">
                    <h2 className="mb-2 text-2xl font-bold">{course.instructor.name}</h2>
                    <p className="mb-4 text-gray-600">{course.category} Expert</p>
                    
                    <div className="mb-4 flex items-center space-x-4">
                      <div className="flex items-center">
                        <Star className="mr-1 h-5 w-5 text-yellow-400" />
                        <span className="font-medium">4.8</span>
                        <span className="ml-1 text-gray-600">Instructor Rating</span>
                      </div>
                      <div className="flex items-center">
                        <User className="mr-1 h-5 w-5 text-gray-500" />
                        <span className="font-medium">15,243</span>
                        <span className="ml-1 text-gray-600">Students</span>
                      </div>
                      <div className="flex items-center">
                        <Book className="mr-1 h-5 w-5 text-gray-500" />
                        <span className="font-medium">12</span>
                        <span className="ml-1 text-gray-600">Courses</span>
                      </div>
                    </div>
                    
                    <p className="mb-4 text-gray-700">
                      {course.instructor.name} is a seasoned professional with over 10 years of experience
                      in {course.category}. They have worked with leading organizations and have
                      a passion for teaching and making complex concepts accessible to everyone.
                    </p>
                    
                    <p className="text-gray-700">
                      Their teaching approach combines theoretical knowledge with practical,
                      hands-on exercises to ensure students gain both understanding and
                      applicable skills. They are committed to providing high-quality education
                      in both English and Hausa languages.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="animate-fade-in">
                <div className="mb-8 flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-6 sm:flex-row">
                  <div className="mb-6 text-center sm:mb-0 sm:w-1/3 sm:border-r sm:border-gray-200 sm:pr-6">
                    <div className="mb-2 text-5xl font-bold text-gray-900">{course.rating.toFixed(1)}</div>
                    <div className="mb-4 flex justify-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-6 w-6 ${
                            i < Math.floor(course.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : i < course.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">Course Rating</p>
                  </div>
                  
                  <div className="sm:w-2/3 sm:pl-6">
                    <h3 className="mb-4 text-lg font-semibold">Rating Breakdown</h3>
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="mb-2 flex items-center">
                        <div className="mr-2 w-10 text-sm">{rating} stars</div>
                        <div className="mr-2 h-2.5 w-full flex-1 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="h-2.5 rounded-full bg-primary-500"
                            style={{
                              width: `${
                                rating === 5
                                  ? '70'
                                  : rating === 4
                                  ? '20'
                                  : rating === 3
                                  ? '7'
                                  : rating === 2
                                  ? '2'
                                  : '1'
                              }%`,
                            }}
                          ></div>
                        </div>
                        <div className="w-10 text-sm text-gray-600">
                          {rating === 5
                            ? '70%'
                            : rating === 4
                            ? '20%'
                            : rating === 3
                            ? '7%'
                            : rating === 2
                            ? '2%'
                            : '1%'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="mb-4 text-xl font-semibold">Student Reviews</h3>
                  <div className="space-y-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="border-b border-gray-100 pb-6 last:border-0">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center">
                            <img
                              src={`https://i.pravatar.cc/150?img=${i + 10}`}
                              alt="Student"
                              className="mr-3 h-10 w-10 rounded-full"
                            />
                            <div>
                              <p className="font-medium">
                                {['Ibrahim Mohammed', 'Fatima Sani', 'Ahmed Yunus'][i]}
                              </p>
                              <div className="flex text-yellow-400">
                                {Array.from({ length: 5 }).map((_, starIndex) => (
                                  <Star
                                    key={starIndex}
                                    className={`h-4 w-4 ${
                                      starIndex < 5 - i
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {['2 weeks ago', '1 month ago', '2 months ago'][i]}
                          </div>
                        </div>
                        <p className="text-gray-700">
                          {[
                            'This course was exactly what I needed! The instructor explains everything clearly in Hausa, which helped me understand concepts I struggled with before. The projects were practical and I can now build my own applications.',
                            'I\'m impressed by the quality of this course. The ability to switch between English and Hausa made learning so much easier for me. The instructor is knowledgeable and responsive to questions.',
                            'Great course for beginners. I had no prior experience but the step-by-step approach made it easy to follow along. Highly recommend to anyone looking to learn these skills.',
                          ][i]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* CTA Section */}
          <div className="rounded-lg bg-gray-50 p-8 shadow-sm">
            <div className="flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
              <div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900">Ready to start learning?</h3>
                <p className="text-gray-600">
                  Enroll now and join {course.studentsCount}+ students already learning.
                </p>
              </div>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                {isEnrolled ? (
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={<Play className="h-5 w-5" />}
                    onClick={startLearning}
                  >
                    {t('course.continue')}
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="lg"
                    isLoading={loading}
                    onClick={handleEnroll}
                  >
                    {t('course.enroll')}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;