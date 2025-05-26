import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap as Graduation, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="mb-4 flex items-center">
              <img 
                src="/img/logo_white.png" 
                alt="Hausasoft Logo" 
                className="h-10 w-auto object-contain mr-2"
              />
            </div>
            <p className="mb-4 text-gray-400">
              {t('app.tagline')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 transition-colors hover:text-primary-400">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-primary-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-primary-400">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-primary-400">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 transition-colors hover:text-primary-400">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-400 transition-colors hover:text-primary-400">
                  {t('nav.courses')}
                </Link>
              </li>
              <li>
                <a href="/#about" className="text-gray-400 transition-colors hover:text-primary-400" onClick={e => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    const aboutSection = document.getElementById('about');
                    if (aboutSection) {
                      aboutSection.scrollIntoView({ behavior: 'smooth' });
                      aboutSection.classList.add('ring-4', 'ring-primary-500', 'transition');
                      setTimeout(() => {
                        aboutSection.classList.remove('ring-4', 'ring-primary-500', 'transition');
                      }, 2000);
                    }
                    window.history.replaceState(null, '', '/#about');
                  }
                }}>
                  {t('footer.about')}
                </a>
              </li>
              <li>
                <Link to="/#testimonials" className="text-gray-400 transition-colors hover:text-primary-400" onClick={e => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    const testimonialsSection = document.getElementById('testimonials');
                    if (testimonialsSection) {
                      testimonialsSection.scrollIntoView({ behavior: 'smooth' });
                      testimonialsSection.classList.add('ring-4', 'ring-primary-500', 'transition');
                      setTimeout(() => {
                        testimonialsSection.classList.remove('ring-4', 'ring-primary-500', 'transition');
                      }, 2000);
                    }
                    window.history.replaceState(null, '', '/#testimonials');
                  }
                }}>
                  {t('footer.testimonials')}
                </Link>
              </li>
              <li>
                <Link to="/ai" className="text-gray-400 transition-colors hover:text-primary-400">
                  {t('nav.ai')}
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 transition-colors hover:text-primary-400">
                  {t('nav.support')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-400 transition-colors hover:text-primary-400">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 transition-colors hover:text-primary-400">
                  Mobile App Development
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 transition-colors hover:text-primary-400">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 transition-colors hover:text-primary-400">
                  Graphic Design
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 transition-colors hover:text-primary-400">
                  Data Science
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-primary-400" />
                <span className="text-gray-400">
                  Kano, Nigeria
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-primary-400" />
                <span className="text-gray-400">08169920252</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-primary-400" />
                <span className="text-gray-400">hausasoft@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400">
            &copy; {currentYear} Hausasoft Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;