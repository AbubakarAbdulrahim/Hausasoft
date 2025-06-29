import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, Facebook, Apple } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import GoogleIcon from '../../assets/google.svg';
import Modal from '../../components/common/Modal';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  const from = (location.state as any)?.from || '/';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setShowModal(false);
    if (!email || !password || password.length < 8) {
      setError('Please enter a valid email and password (min 8 characters).');
      setShowModal(true);
      console.log('Validation error: email or password');
      return;
    }
    setLoading(true);
    try {
      const result = await login(email, password);
      console.log('Login API result:', result);
      if (result.success) {
        setSuccess(result.message);
        setShowModal(true);
        setLoading(true);
        console.log('Login success, modal should show');
        setTimeout(() => {
          setLoading(false);
          setShowModal(false);
          navigate(from, { replace: true });
        }, 1500);
      } else {
        setError(result.message);
        setShowModal(true);
        console.log('Login error, modal should show');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      setShowModal(true);
      console.log('Login catch error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (showModal && (error || success)) {
      const timer = setTimeout(() => {
        setShowModal(false);
        setError('');
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showModal, error, success]);
  
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-16rem)] items-center justify-center p-4 animate-fade-in">
      <Card className="mx-auto w-full max-w-md border border-gray-200">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
            <LogIn className="h-8 w-8 text-primary-600" />
          </div>
        </div>
        
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
          {t('auth.login.title')}
        </h1>
        
        <Modal
          open={!!error || !!success ? showModal : false}
          onClose={() => { setShowModal(false); setError(''); setSuccess(''); }}
          type={success ? 'success' : 'error'}
        >
          {success ? (
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="text-green-700 text-base font-semibold mb-2">{success}</div>
              <div className="text-sm text-gray-600">Redirecting...</div>
              {loading && (
                <div className="mt-2 flex items-center justify-center">
                  <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-green-500 border-t-transparent"></span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-red-700 text-base font-medium">{error === 'Invalid email or password. Please try again.' ? 'Email or password is incorrect.' : error}</div>
          )}
        </Modal>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              {t('auth.email')}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                type="email"
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
              {t('auth.password')}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type="password"
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            <div className="mt-2 text-right">
              <Link to="/forgot-password" className="text-xs text-green-700 hover:underline font-medium">
                Forgot password?
              </Link>
            </div>
          </div>
          
          <Button
            variant="green"
            className="w-full"
            type="submit"
            isLoading={loading}
          >
            {t('auth.login.button')}
          </Button>
        </form>
        
        <div className="my-6 flex items-center justify-center gap-2">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">or sign in with</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
        <div className="flex flex-col gap-3 mb-4">
          <button type="button" className="flex items-center justify-center gap-2 w-full border border-gray-200 rounded-lg py-2 font-medium text-gray-700 bg-white hover:bg-gray-50 transition">
            <span className="h-5 w-5 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_17_40)">
                  <path d="M47.5 24.5C47.5 22.8 47.3 21.2 47 19.7H24V28.3H37.2C36.6 31.2 34.7 33.6 32 35.1V40.1H39.6C44.1 36.1 47.5 30.9 47.5 24.5Z" fill="#4285F4"/>
                  <path d="M24 48C30.5 48 35.9 45.9 39.6 40.1L32 35.1C30.1 36.3 27.7 37.1 24 37.1C18.7 37.1 14.1 33.7 12.5 29.1H4.7V34.3C8.4 41.1 15.6 48 24 48Z" fill="#34A853"/>
                  <path d="M12.5 29.1C11.9 27.6 11.5 25.9 11.5 24C11.5 22.1 11.9 20.4 12.5 18.9V13.7H4.7C2.7 17.1 1.5 20.9 1.5 24C1.5 27.1 2.7 30.9 4.7 34.3L12.5 29.1Z" fill="#FBBC05"/>
                  <path d="M24 10.9C27.1 10.9 29.6 12 31.4 13.7L39.7 6.1C35.9 2.5 30.5 0 24 0C15.6 0 8.4 6.9 4.7 13.7L12.5 18.9C14.1 14.3 18.7 10.9 24 10.9Z" fill="#EA4335"/>
                </g>
                <defs>
                  <clipPath id="clip0_17_40">
                    <rect width="48" height="48" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </span>
            Sign in with Google
          </button>
          <button type="button" className="flex items-center justify-center gap-2 w-full border border-gray-200 rounded-lg py-2 font-medium text-gray-700 bg-white hover:bg-gray-50 transition">
            <span className="h-5 w-5 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="16" fill="#1877F3"/>
                <path d="M21.5 16H18V25H14V16H12V13H14V11.5C14 9.6 15.1 7 19 7H21V11H19.5C19.2 11 19 11.2 19 11.5V13H21.5L21 16Z" fill="white"/>
              </svg>
            </span>
            Sign in with Facebook
          </button>
          <button type="button" className="flex items-center justify-center gap-2 w-full border border-gray-200 rounded-lg py-2 font-medium text-gray-700 bg-white hover:bg-gray-50 transition">
            <span className="h-6 w-6 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                <path d="M19.665 12.845c-.017-2.14 1.75-3.164 1.827-3.211-1-1.46-2.56-1.662-3.11-1.684-1.32-.134-2.58.77-3.25.77-.67 0-1.7-.75-2.8-.73-1.44.021-2.58.84-3.51 2.13-1.5 2.6-.39 6.44 1.08 8.55.72 1.04 1.58 2.2 2.71 2.16 1.09-.044 1.5-.7 2.81-.7 1.31 0 1.67.7 2.81.68 1.17-.02 1.91-1.06 2.62-2.1.83-1.19 1.17-2.34 1.19-2.4-.026-.012-2.28-.87-2.3-3.45zm-2.7-6.7c.59-.71.99-1.7.88-2.68-.85.034-1.87.57-2.48 1.28-.54.62-1.01 1.61-.83 2.56.88.07 1.79-.44 2.43-1.16z"/>
              </svg>
            </span>
            Sign in with Apple
          </button>
        </div>
        
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">{t('auth.login.noAccount')}</span>
          <Link to="/register" className="ml-1 font-medium text-primary-600 hover:text-primary-500">
            {t('auth.register.button')}
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;