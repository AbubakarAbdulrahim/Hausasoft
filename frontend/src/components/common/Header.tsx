import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, User, LogOut } from 'lucide-react';
import Button from './Button';
import LanguageSwitcher from './LanguageSwitcher';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import Modal from './Modal';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(location.pathname);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/dashboard/admin';
    if (user.role === 'instructor') return '/dashboard/instructor';
    return '/dashboard/student';
  };

  const handleLogout = () => {
    setLogoutModalOpen(true);
    setTimeout(() => {
      setLogoutModalOpen(false);
      logout();
    }, 1200);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    if (logoutModalOpen) {
      const timer = setTimeout(() => {
        setLogoutModalOpen(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [logoutModalOpen]);

  useEffect(() => {
    setActiveSection(location.pathname);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-green-600 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 h-full">
          <img 
            src="/img/logo_white.png" 
            alt="Hausasoft Logo" 
            className="h-3/4 max-h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-8 md:flex">
          <Link
            to="/"
            className={`text-sm font-medium px-3 py-1 rounded transition-colors ${(location.pathname === '/' && !location.hash) ? 'bg-white/90 text-green-700 shadow' : 'text-white hover:bg-white/20 hover:text-white'}`}
          >
            {t('nav.home')}
          </Link>
          <Link
            to="/courses"
            className={`text-sm font-medium px-3 py-1 rounded transition-colors ${isActive('/courses') ? 'bg-white/90 text-green-700 shadow' : 'text-white hover:bg-white/20 hover:text-white'}`}
          >
            {t('nav.courses')}
          </Link>
          <Link
            to={getDashboardLink()}
            className={`text-sm font-medium px-3 py-1 rounded transition-colors ${location.pathname.includes('/dashboard') ? 'bg-white/90 text-green-700 shadow' : 'text-white hover:bg-white/20 hover:text-white'}`}
          >
            {t('nav.dashboard')}
          </Link>
          <Link
            to="/ai"
            className={`text-sm font-medium px-3 py-1 rounded transition-colors ${(user && activeSection === '/ai') ? 'bg-white/90 text-green-700 shadow' : 'text-white hover:bg-white/20 hover:text-white'}`}
          >
            {t('nav.ai')}
          </Link>
          <Link
            to="/support"
            className={`text-sm font-medium px-3 py-1 rounded transition-colors ${(user && activeSection === '/support') ? 'bg-white/90 text-green-700 shadow' : 'text-white hover:bg-white/20 hover:text-white'}`}
          >
            {t('nav.support')}
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center space-x-4 md:flex">
          <LanguageSwitcher />
          
          {user ? (
            <div className="flex items-center space-x-4">
              <div
                className="relative"
                ref={dropdownRef}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button className="flex items-center space-x-2 focus:outline-none">
                  <span className="h-8 w-8 overflow-hidden rounded-full border-2 border-white block">
                    <img
                      src={user.avatar || 'https://i.pravatar.cc/150'}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span className="text-sm font-medium text-white">{user.name}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <Link
                      to="/dashboard/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User className="mr-2 h-4 w-4 text-green-700" />
                      Profile
                    </Link>
                    <Link
                      to={getDashboardLink()}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4 text-green-700" />
                      {t('nav.dashboard')}
                    </Link>
                    <button
                      onClick={() => { setDropdownOpen(false); handleLogout(); }}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                    >
                      <LogOut className="mr-2 h-4 w-4 text-green-700" />
                      {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline" size="sm" className="text-white border-white hover:bg-green-200 hover:text-green-800">
                  {t('nav.login')}
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm" className="bg-white text-green-700 border-white hover:bg-green-200 hover:text-green-800">
                  {t('nav.register')}
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-white md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } border-t border-gray-200 bg-white md:hidden`}
      >
        <div className="space-y-1 px-4 py-2">
          <Link
            to="/"
            className={`block rounded px-3 py-2 text-base font-medium transition-colors ${(location.pathname === '/' && !location.hash) ? 'bg-primary-100 text-green-700 shadow' : 'text-gray-700 hover:bg-primary-50 hover:text-green-700'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav.home')}
          </Link>
          <Link
            to="/courses"
            className={`block rounded px-3 py-2 text-base font-medium transition-colors ${isActive('/courses') ? 'bg-primary-100 text-green-700 shadow' : 'text-gray-700 hover:bg-primary-50 hover:text-green-700'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav.courses')}
          </Link>
          <Link
            to={getDashboardLink()}
            className={`block rounded px-3 py-2 text-base font-medium transition-colors ${location.pathname.includes('/dashboard') ? 'bg-primary-100 text-green-700 shadow' : 'text-gray-700 hover:bg-primary-50 hover:text-green-700'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav.dashboard')}
          </Link>
          <Link
            to="/ai"
            className={`block rounded px-3 py-2 text-base font-medium transition-colors ${(user && activeSection === '/ai') ? 'bg-primary-100 text-green-700 shadow' : 'text-gray-700 hover:bg-primary-50 hover:text-green-700'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav.ai')}
          </Link>
          <Link
            to="/support"
            className={`block rounded px-3 py-2 text-base font-medium transition-colors ${(user && activeSection === '/support') ? 'bg-primary-100 text-green-700 shadow' : 'text-gray-700 hover:bg-primary-50 hover:text-green-700'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav.support')}
          </Link>
        </div>
        
        <div className="border-t border-gray-200 px-4 py-5">
          <div className="flex flex-col space-y-3">
            <LanguageSwitcher />
            {user ? (
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary-100">
                    <img
                      src={user.avatar || 'https://i.pravatar.cc/150'}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <Link to="/dashboard/profile" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full justify-center">
                    Profile
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center"
                  onClick={handleLogout}
                >
                  {t('nav.logout')}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full justify-center">
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="primary" size="sm" className="w-full justify-center">
                    {t('nav.register')}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for logout success */}
      <Modal
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        type="success"
      >
        You have been logged out successfully.
      </Modal>
    </header>
  );
};

export default Header;