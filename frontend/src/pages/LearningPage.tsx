import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Play,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  List,
  X,
  Download,
  MessageSquare,
  Flag,
  BookOpen,
} from 'lucide-react';
import Button from '../components/common/Button';
import { mockCourses } from '../data/mockCourses';
import { Course } from '../types/course';
import ReactPlayer from 'react-player/lazy';

// Sample lesson data
const MOCK_LESSONS = [
  {
    id: '1',
    title: 'Introduction to the Course',
    type: 'video',
    duration: '10:15',
    videoUrl: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
    completed: true,
  },
  {
    id: '2',
    title: 'Getting Started with the Basics',
    type: 'video',
    duration: '15:30',
    videoUrl: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
    completed: true,
  },
  {
    id: '3',
    title: 'Core Concepts',
    type: 'video',
    duration: '12:45',
    videoUrl: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
    completed: false,
  },
  {
    id: '4',
    title: 'Practical Example',
    type: 'video',
    duration: '18:20',
    videoUrl: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
    completed: false,
  },
  {
    id: '5',
    title: 'Quiz: Test Your Knowledge',
    type: 'quiz',
    duration: '10:00',
    completed: false,
  },
];

const LearningPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState(MOCK_LESSONS[0]);
  const [progress, setProgress] = useState(25);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [notes, setNotes] = useState('');
  
  useEffect(() => {
    // Find course from mock data
    const foundCourse = mockCourses.find(c => c.id === courseId);
    
    if (foundCourse) {
      setCourse(foundCourse);
    }
  }, [courseId]);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleLessonClick = (lesson: typeof MOCK_LESSONS[0]) => {
    setActiveLesson(lesson);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };
  
  const markComplete = () => {
    const updatedLessons = MOCK_LESSONS.map(lesson => 
      lesson.id === activeLesson.id ? { ...lesson, completed: true } : lesson
    );
    
    const completedCount = updatedLessons.filter(l => l.completed).length;
    const newProgress = Math.round((completedCount / updatedLessons.length) * 100);
    
    setProgress(newProgress);
    
    // Find next uncompleted lesson
    const currentIndex = MOCK_LESSONS.findIndex(l => l.id === activeLesson.id);
    const nextLesson = MOCK_LESSONS[currentIndex + 1];
    
    if (nextLesson) {
      setActiveLesson(nextLesson);
    }
  };
  
  const handleNext = () => {
    const currentIndex = MOCK_LESSONS.findIndex(l => l.id === activeLesson.id);
    if (currentIndex < MOCK_LESSONS.length - 1) {
      setActiveLesson(MOCK_LESSONS[currentIndex + 1]);
    }
  };
  
  const handlePrev = () => {
    const currentIndex = MOCK_LESSONS.findIndex(l => l.id === activeLesson.id);
    if (currentIndex > 0) {
      setActiveLesson(MOCK_LESSONS[currentIndex - 1]);
    }
  };
  
  if (!course) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen flex-col bg-gray-100">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4">
        <div className="flex items-center">
          <Link to={`/courses/${courseId}`} className="mr-4 flex items-center text-gray-600 hover:text-primary-600">
            <ChevronLeft className="h-5 w-5" />
            <span className="ml-1 hidden sm:inline">Back to course</span>
          </Link>
          <h1 className="truncate text-lg font-semibold">
            {course.title}
          </h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-primary-600 lg:hidden"
            onClick={toggleSidebar}
          >
            <List className="h-5 w-5" />
            <span className="sr-only">Toggle Sidebar</span>
          </button>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (Curriculum) */}
        <aside 
          className={`absolute inset-y-0 left-0 z-20 w-80 flex-shrink-0 transform overflow-y-auto border-r border-gray-200 bg-white pt-16 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="sticky top-0 z-10 border-b border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Course Content</h2>
              <button 
                className="rounded-md p-1 text-gray-500 hover:bg-gray-100 lg:hidden"
                onClick={toggleSidebar}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-2">
              <div className="mb-1 flex items-center justify-between text-sm">
                <span>Your progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div 
                  className="h-2 rounded-full bg-primary-500" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {MOCK_LESSONS.map((lesson, index) => (
              <button
                key={lesson.id}
                className={`flex w-full items-center p-4 text-left hover:bg-gray-50 ${
                  activeLesson.id === lesson.id ? 'bg-primary-50' : ''
                }`}
                onClick={() => handleLessonClick(lesson)}
              >
                <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-xs">
                  {lesson.completed ? (
                    <CheckCircle className="h-5 w-5 text-primary-500" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{lesson.title}</div>
                  <div className="flex items-center text-sm text-gray-500">
                    {lesson.type === 'video' ? (
                      <Play className="mr-1 h-3 w-3" />
                    ) : (
                      <BookOpen className="mr-1 h-3 w-3" />
                    )}
                    {lesson.duration}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>
        
        {/* Backdrop for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        )}
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto max-w-4xl px-4 py-6">
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold">{activeLesson.title}</h2>
              <div className="text-sm text-gray-500">
                {activeLesson.type === 'video' ? 'Video Lesson' : 'Quiz'} • {activeLesson.duration}
              </div>
            </div>
            
            {/* Video Player */}
            {activeLesson.type === 'video' && (
              <div className="mb-6 overflow-hidden rounded-lg bg-black shadow-lg">
                <div className="aspect-w-16 aspect-h-9">
                  <ReactPlayer
                    url={activeLesson.videoUrl}
                    width="100%"
                    height="100%"
                    controls
                    playing={isVideoPlaying}
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                  />
                </div>
              </div>
            )}
            
            {/* Quiz Content (Simplified) */}
            {activeLesson.type === 'quiz' && (
              <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-semibold">Module Quiz</h3>
                <p className="mb-4 text-gray-700">
                  Test your knowledge of the concepts covered in this module. You need to score at least 70% to pass.
                </p>
                <div className="space-y-6">
                  {[1, 2, 3].map((q) => (
                    <div key={q} className="border-b border-gray-100 pb-4 last:border-0">
                      <p className="mb-3 font-medium">
                        {q}. Sample question about the course material?
                      </p>
                      <div className="space-y-2">
                        {['Option A', 'Option B', 'Option C', 'Option D'].map((option, i) => (
                          <label key={i} className="flex items-center">
                            <input
                              type="radio"
                              name={`question-${q}`}
                              className="h-4 w-4 text-primary-600"
                            />
                            <span className="ml-2">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Resources and Downloads */}
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">Resources</h3>
              <div className="space-y-2">
                <a 
                  href="#" 
                  className="flex items-center rounded-md border border-gray-200 p-3 hover:bg-gray-50"
                >
                  <Download className="mr-3 h-5 w-5 text-primary-500" />
                  <div>
                    <div className="font-medium">Lesson Slides</div>
                    <div className="text-sm text-gray-500">PDF, 2.4MB</div>
                  </div>
                </a>
                <a 
                  href="#" 
                  className="flex items-center rounded-md border border-gray-200 p-3 hover:bg-gray-50"
                >
                  <Download className="mr-3 h-5 w-5 text-primary-500" />
                  <div>
                    <div className="font-medium">Exercise Files</div>
                    <div className="text-sm text-gray-500">ZIP, 1.8MB</div>
                  </div>
                </a>
              </div>
            </div>
            
            {/* Notes Section */}
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">Your Notes</h3>
              <textarea
                className="w-full rounded-md border border-gray-300 p-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={4}
                placeholder="Take notes on this lesson..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
              <div className="mt-2 text-right">
                <Button variant="outline" size="sm">
                  Save Notes
                </Button>
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="mt-6 flex items-center justify-between">
              <Button
                variant="outline"
                leftIcon={<ChevronLeft className="h-5 w-5" />}
                onClick={handlePrev}
                disabled={MOCK_LESSONS.findIndex(l => l.id === activeLesson.id) === 0}
              >
                Previous
              </Button>
              
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Flag className="h-4 w-4" />}
                >
                  Report Issue
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<MessageSquare className="h-4 w-4" />}
                >
                  Discussion
                </Button>
              </div>
              
              {activeLesson.completed ? (
                <Button
                  variant="primary"
                  rightIcon={<ChevronRight className="h-5 w-5" />}
                  onClick={handleNext}
                  disabled={MOCK_LESSONS.findIndex(l => l.id === activeLesson.id) === MOCK_LESSONS.length - 1}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="primary"
                  rightIcon={<CheckCircle className="h-5 w-5" />}
                  onClick={markComplete}
                >
                  Mark as Complete
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LearningPage;