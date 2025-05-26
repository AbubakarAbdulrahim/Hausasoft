import React, { useState, useEffect } from 'react';
import { Search, Filter, SortAsc, ChevronDown } from 'lucide-react';
import CourseCard from '../components/courses/CourseCard';
import Button from '../components/common/Button';
import { useLanguage } from '../hooks/useLanguage';
import { mockCourses } from '../data/mockCourses';
import { Course } from '../types/course';

type SortOption = 'newest' | 'popular' | 'price-low' | 'price-high';

const CoursesPage: React.FC = () => {
  const { t } = useLanguage();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [onlyFree, setOnlyFree] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filteredCourses, setFilteredCourses] = useState(mockCourses);
  const [visibleCount, setVisibleCount] = useState(12);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Get unique categories and levels
  const categories = Array.from(new Set(mockCourses.map(course => course.category)));
  const levels = Array.from(new Set(mockCourses.map(course => course.level)));
  
  // Filter and sort courses
  useEffect(() => {
    let result = [...mockCourses];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        course => 
          course.title.toLowerCase().includes(query) || 
          course.description.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(course => course.category === selectedCategory);
    }
    
    // Apply level filter
    if (selectedLevel) {
      result = result.filter(course => course.level === selectedLevel);
    }
    
    // Apply free filter
    if (onlyFree) {
      result = result.filter(course => course.isFree);
    }
    
    // Apply sorting
    result = sortCourses(result, sortBy);
    
    setFilteredCourses(result);
    setVisibleCount(12); // Reset visible count on filter change
  }, [searchQuery, selectedCategory, selectedLevel, onlyFree, sortBy]);
  
  const sortCourses = (courses: Course[], option: SortOption) => {
    switch (option) {
      case 'newest':
        return [...courses].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'popular':
        return [...courses].sort((a, b) => b.studentsCount - a.studentsCount);
      case 'price-low':
        return [...courses].sort((a, b) => {
          if (a.isFree && !b.isFree) return -1;
          if (!a.isFree && b.isFree) return 1;
          return a.price - b.price;
        });
      case 'price-high':
        return [...courses].sort((a, b) => {
          if (a.isFree && !b.isFree) return 1;
          if (!a.isFree && b.isFree) return -1;
          return b.price - a.price;
        });
      default:
        return courses;
    }
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedLevel(null);
    setOnlyFree(false);
    setSortBy('newest');
  };
  
  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          {t('courses.title')}
        </h1>
        <p className="mx-auto max-w-2xl text-gray-600">
          Enhance your skills with our comprehensive courses designed to teach you the most in-demand tech skills
        </p>
      </div>
      
      {/* Search and Filters */}
      <div className="mb-8 rounded-lg bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('courses.search')}
              className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Mobile Filter Button */}
          <div className="flex space-x-2 md:hidden">
            <Button
              variant="outline"
              className="flex-1 justify-center"
              onClick={toggleFilters}
              leftIcon={<Filter className="h-5 w-5" />}
            >
              {t('courses.filter')}
            </Button>
            <div className="relative inline-block text-left flex-1">
              <button
                className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                onClick={() => {
                  const select = document.getElementById('mobileSortSelect') as HTMLSelectElement;
                  select.focus();
                  select.click();
                }}
              >
                <div className="flex items-center">
                  <SortAsc className="mr-2 h-5 w-5 text-gray-400" />
                  {t('courses.sort')}
                </div>
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </button>
              <select
                id="mobileSortSelect"
                className="absolute inset-0 h-full w-full opacity-0"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
          
          {/* Desktop Filters */}
          <div className="hidden items-center space-x-4 md:flex">
            <div className="relative inline-block text-left">
              <select
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
              >
                <option value="">{t('courses.category')}: All</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="relative inline-block text-left">
              <select
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={selectedLevel || ''}
                onChange={(e) => setSelectedLevel(e.target.value || null)}
              >
                <option value="">{t('courses.level')}: All</option>
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="freeFilter"
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                checked={onlyFree}
                onChange={(e) => setOnlyFree(e.target.checked)}
              />
              <label htmlFor="freeFilter" className="text-sm font-medium text-gray-700">
                {t('courses.free')}
              </label>
            </div>
            
            <div className="relative inline-block text-left">
              <select
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
            
            {(searchQuery || selectedCategory || selectedLevel || onlyFree) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
        
        {/* Mobile Filters Panel */}
        {isFilterOpen && (
          <div className="mt-4 border-t border-gray-200 pt-4 md:hidden">
            <div className="space-y-4">
              <div>
                <label htmlFor="categoryFilter" className="block text-sm font-medium text-gray-700">
                  {t('courses.category')}
                </label>
                <select
                  id="categoryFilter"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="levelFilter" className="block text-sm font-medium text-gray-700">
                  {t('courses.level')}
                </label>
                <select
                  id="levelFilter"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                  value={selectedLevel || ''}
                  onChange={(e) => setSelectedLevel(e.target.value || null)}
                >
                  <option value="">All Levels</option>
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="mobileFreeFilter"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  checked={onlyFree}
                  onChange={(e) => setOnlyFree(e.target.checked)}
                />
                <label htmlFor="mobileFreeFilter" className="ml-2 text-sm font-medium text-gray-700">
                  Only show free courses
                </label>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={toggleFilters}
                >
                  Apply Filters
                </Button>
                {(searchQuery || selectedCategory || selectedLevel || onlyFree) && (
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Course Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.slice(0, visibleCount).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <div className="col-span-full py-10 text-center">
            <p className="text-lg text-gray-600">{t('courses.notFound')}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      {visibleCount < filteredCourses.length && (
        <div className="flex justify-center mt-8">
          <Button variant="primary" onClick={() => setVisibleCount(v => v + 12)}>
            Show More
          </Button>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;