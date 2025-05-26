import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setShowModal(false);
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      setShowModal(true);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess('If an account with that email exists, a reset link has been sent.');
      setShowModal(true);
    }, 1200);
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
            <Mail className="h-8 w-8 text-primary-600" />
          </div>
        </div>
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">Forgot Password</h1>
        <Modal
          open={!!error || !!success ? showModal : false}
          onClose={() => { setShowModal(false); setError(''); setSuccess(''); }}
          type={success ? 'success' : 'error'}
        >
          {success || error}
        </Modal>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Email Address
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
          <Button
            variant="green"
            className="w-full"
            type="submit"
            isLoading={loading}
          >
            Send Reset Link
          </Button>
        </form>
        <div className="mt-6 text-center text-sm">
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            Back to Login
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage; 