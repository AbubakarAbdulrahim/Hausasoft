import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle, Play, Users, BookOpen, Award, Star } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import CourseCard from '../components/courses/CourseCard';
import { useLanguage } from '../hooks/useLanguage';
import { mockCourses } from '../data/mockCourses';
import { useCountUp } from '../hooks/useCountUp';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  
  const popularCourses = mockCourses.slice(0, 6);
  
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#about' && aboutRef.current) {
        aboutRef.current.scrollIntoView({ behavior: 'smooth' });
        aboutRef.current.classList.add('ring-4', 'ring-primary-500', 'transition');
        setTimeout(() => {
          aboutRef.current && aboutRef.current.classList.remove('ring-4', 'ring-primary-500', 'transition');
        }, 2000);
      }
      if (window.location.hash === '#testimonials' && testimonialsRef.current) {
        testimonialsRef.current.scrollIntoView({ behavior: 'smooth' });
        testimonialsRef.current.classList.add('ring-4', 'ring-primary-500', 'transition');
        setTimeout(() => {
          testimonialsRef.current && testimonialsRef.current.classList.remove('ring-4', 'ring-primary-500', 'transition');
        }, 2000);
      }
      if (window.location.hash === '#contact' && contactRef.current) {
        contactRef.current.scrollIntoView({ behavior: 'smooth' });
        contactRef.current.classList.add('ring-4', 'ring-primary-500', 'transition');
        setTimeout(() => {
          contactRef.current && contactRef.current.classList.remove('ring-4', 'ring-primary-500', 'transition');
        }, 2000);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    // Run on mount in case user lands directly with hash
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const courses = useCountUp(10, 2000);
  const students = useCountUp(1000, 2000);
  const instructors = useCountUp(10, 2000);
  const languages = useCountUp(2, 2000);

  return (
    <div className="animate-fade-in">
      {/* Hero Image Section */}
      <section className="relative h-[70vh] w-full flex items-center justify-center bg-gray-200" data-aos="fade-up">
        <img
          src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1500&q=80"
          alt="Hausasoft Technologies Hero"
          className="absolute inset-0 h-full w-full object-cover object-center z-0"
        />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full bg-black/40">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-center drop-shadow-lg">
            {t('home.hero.title')}
          </h1>
          <p className="text-lg sm:text-2xl text-white mb-8 text-center max-w-2xl drop-shadow-lg">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex flex-col w-full max-w-xs space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 sm:justify-center">
            <Link to="/courses">
              <Button variant="accent" size="lg" className="w-full sm:w-auto">
                {t('home.hero.cta')}
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="lg" className="w-full border-white bg-transparent text-white hover:bg-white hover:text-primary-700 sm:w-auto">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Stats */}
      <div className="bg-green-100 py-10" data-aos="fade-up">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-lg bg-green-600 p-4 text-center text-white">
              <div className="text-3xl font-bold">{courses}+</div>
              <div className="text-sm">Courses</div>
            </div>
            <div className="rounded-lg bg-green-600 p-4 text-center text-white">
              <div className="text-3xl font-bold">{students}+</div>
              <div className="text-sm">Students</div>
            </div>
            <div className="rounded-lg bg-green-600 p-4 text-center text-white">
              <div className="text-3xl font-bold">{instructors}+</div>
              <div className="text-sm">Instructors</div>
            </div>
            <div className="rounded-lg bg-green-600 p-4 text-center text-white">
              <div className="text-3xl font-bold">{languages}</div>
              <div className="text-sm">Languages</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <section className="py-16 sm:py-24" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              {t('home.features.title')}
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Our platform provides an accessible, engaging learning experience designed for everyone
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="relative overflow-hidden border-t-4 border-primary-500 p-8">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                <BookOpen className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Bilingual Learning</h3>
              <p className="text-gray-600">
                All courses available in both English and Hausa languages, making quality education accessible to everyone.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary-500" />
                  <span className="text-sm">Full interface translation</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary-500" />
                  <span className="text-sm">Subtitled video content</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary-500" />
                  <span className="text-sm">Localized learning materials</span>
                </li>
              </ul>
            </Card>
            
            <Card className="relative overflow-hidden border-t-4 border-secondary-500 p-8">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary-100 text-secondary-600">
                <Play className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Engaging Content</h3>
              <p className="text-gray-600">
                Interactive lessons with videos, quizzes, and projects to make learning enjoyable and effective.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-secondary-500" />
                  <span className="text-sm">HD video tutorials</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-secondary-500" />
                  <span className="text-sm">Interactive assessments</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-secondary-500" />
                  <span className="text-sm">Hands-on projects</span>
                </li>
              </ul>
            </Card>
            
            <Card className="relative overflow-hidden border-t-4 border-accent-500 p-8">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent-100 text-accent-600">
                <Award className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Certification</h3>
              <p className="text-gray-600">
                Earn recognized certificates upon course completion to showcase your skills to employers.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-accent-500" />
                  <span className="text-sm">Industry-recognized credentials</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-accent-500" />
                  <span className="text-sm">Digital badges</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-accent-500" />
                  <span className="text-sm">Shareable achievements</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Popular Courses Section */}
      <section className="bg-gray-50 py-16 sm:py-24" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {t('home.popular.title')}
            </h2>
            <Link
              to="/courses"
              className="hidden rounded-md px-4 py-2 text-primary-600 transition-colors hover:bg-primary-50 sm:block"
            >
              View All Courses <ChevronRight className="ml-1 inline h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popularCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link to="/courses">
              <Button variant="outline">
                View All Courses <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Us Section */}
      <section id="about" ref={aboutRef} className="py-16 sm:py-24 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">About Us</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Hausasoft Technologies is dedicated to making quality tech education accessible to everyone. Our mission is to empower learners by providing bilingual courses, engaging content, and industry-recognized certifications. We believe in breaking barriers and building a community where everyone can thrive in the digital world.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-green-50 p-6 shadow">
              <h3 className="text-xl font-semibold text-green-700 mb-2">Our Mission</h3>
              <p className="text-gray-700">To bridge the digital divide by offering high-quality, accessible, and inclusive technology education in both English and Hausa languages.</p>
            </div>
            <div className="rounded-lg bg-green-50 p-6 shadow">
              <h3 className="text-xl font-semibold text-green-700 mb-2">Our Values</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Accessibility for all</li>
                <li>Community-driven learning</li>
                <li>Continuous innovation</li>
                <li>Empowerment through knowledge</li>
                <li>Celebrating diversity</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section id="testimonials" ref={testimonialsRef} className="py-16 sm:py-24" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              {t('home.testimonials.title')}
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Hear from our students who have transformed their careers through our courses
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border border-gray-100">
              <div className="mb-4 flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="mb-6 text-gray-600">
                "Hausasoft Technologies changed my life. Being able to learn in Hausa made complex tech concepts clear to me. I now work as a web developer at a leading tech company in Kano."
              </p>
              <div className="flex items-center">
                <img
                  src="https://i.pravatar.cc/150?img=11"
                  alt="Student"
                  className="mr-4 h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Amina Ibrahim</h4>
                  <p className="text-sm text-gray-500">Web Developer</p>
                </div>
              </div>
            </Card>
            
            <Card className="border border-gray-100">
              <div className="mb-4 flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="mb-6 text-gray-600">
                "I was struggling to understand programming until I found courses in Hausa. The instructors explain everything clearly, and the practical exercises helped me build real skills."
              </p>
              <div className="flex items-center">
                <img
                  src="https://i.pravatar.cc/150?img=13"
                  alt="Student"
                  className="mr-4 h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Yusuf Mohammed</h4>
                  <p className="text-sm text-gray-500">Mobile App Developer</p>
                </div>
              </div>
            </Card>
            
            <Card className="border border-gray-100">
              <div className="mb-4 flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="mb-6 text-gray-600">
                "As an instructor, I've seen how Hausasoft Technologies bridges the tech education gap. My students can finally learn in their native language, accelerating their understanding."
              </p>
              <div className="flex items-center">
                <img
                  src="https://i.pravatar.cc/150?img=16"
                  alt="Instructor"
                  className="mr-4 h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Fatima Abubakar</h4>
                  <p className="text-sm text-gray-500">Digital Marketing Instructor</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Contact Section (Landing Page Only) */}
      <section id="contact" ref={contactRef} className="py-16 sm:py-24 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl text-center">Contact Us</h2>
          <p className="mb-8 text-center text-gray-600">We'd love to hear from you! Fill out the form below or reach us directly at <span><strong>Location:</strong> Kano, Nigeria</span>, <span><strong>Phone:</strong> 08169920252</span>, <span><strong>Email:</strong> hausasoft@gmail.com</span>.</p>
          <form className="bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-green-100">
            <div>
              <label htmlFor="contact-name" className="block font-medium mb-1 text-green-800">Name</label>
              <input type="text" id="contact-name" name="name" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition shadow-sm bg-white placeholder:text-gray-400" placeholder="Your Name" />
            </div>
            <div>
              <label htmlFor="contact-email" className="block font-medium mb-1 text-green-800">Email</label>
              <input type="email" id="contact-email" name="email" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition shadow-sm bg-white placeholder:text-gray-400" placeholder="you@email.com" />
            </div>
            <div>
              <label htmlFor="contact-message" className="block font-medium mb-1 text-green-800">Message</label>
              <textarea id="contact-message" name="message" rows={5} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition shadow-sm bg-white placeholder:text-gray-400" placeholder="Type your message..." />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition-colors shadow">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;