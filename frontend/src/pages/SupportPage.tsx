import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';

const SupportPage: React.FC = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError(t('support.error'));
      return;
    }
    try {
      const res = await fetch('/api/support-tickets/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to send');
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="container mx-auto py-16 px-4 max-w-xl">
      <h1 className="text-4xl font-bold mb-4 text-center">{t('support.heading')}</h1>
      <p className="mb-8 text-center text-gray-600">{t('support.description')}</p>
      <div className="bg-white rounded-lg shadow p-6">
        {submitted ? (
          <div className="text-green-700 text-center font-semibold mb-4">{t('support.success')}</div>
        ) : null}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block font-medium mb-1 text-green-800">{t('support.name')}</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition shadow-sm bg-white placeholder:text-gray-400"
              placeholder={t('support.namePlaceholder')}
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-1 text-green-800">{t('support.email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition shadow-sm bg-white placeholder:text-gray-400"
              placeholder={t('support.emailPlaceholder')}
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-medium mb-1 text-green-800">{t('support.message')}</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition shadow-sm bg-white placeholder:text-gray-400"
              placeholder={t('support.messagePlaceholder')}
              value={form.message}
              onChange={handleChange}
            />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button type="submit" className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition-colors shadow">{t('support.send')}</button>
        </form>
      </div>
    </div>
  );
};

export default SupportPage; 