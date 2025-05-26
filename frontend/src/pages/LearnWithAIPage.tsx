import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Send, Loader2, GraduationCap, Brain, Code, Calculator } from 'lucide-react';
import { sendMessage } from '../api/aiChat';

const LearnWithAIPage: React.FC = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedTopics = [
    {
      icon: <GraduationCap className="w-5 h-5" />,
      text: 'How can I improve my study techniques?',
      description: 'Get tips for effective learning',
    },
    {
      icon: <Brain className="w-5 h-5" />,
      text: 'Explain complex topics simply',
      description: 'Break down difficult concepts',
    },
    {
      icon: <Code className="w-5 h-5" />,
      text: 'Help me understand programming',
      description: 'Learn coding concepts',
    },
    {
      icon: <Calculator className="w-5 h-5" />,
      text: 'Solve math problems step by step',
      description: 'Get detailed explanations',
    },
  ];

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleTopicClick = (topic: string) => {
    setInput(topic);
    handleSend(null, topic);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setError(null);
  };

  const handleSend = async (e: React.FormEvent | null, forcedInput?: string) => {
    if (e) e.preventDefault();
    const messageText = forcedInput || input;
    if (!messageText.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', text: messageText }]);
    setLoading(true);
    setError(null);
    setInput('');

    try {
      const data = await sendMessage(messageText);
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text:
            data.response ||
            'I apologize, but I was unable to generate a response. Please try rephrasing your question.',
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: 'I apologize, but I encountered an error. Please try asking your question again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Learn with AI Assistant</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your personal AI tutor is here to help you learn. Ask questions, explore topics, and get detailed explanations on any subject.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 min-h-[500px] flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center space-y-6 py-8">
                <div className="text-xl font-semibold text-gray-700 mb-4">
                  Welcome! What would you like to learn today?
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {suggestedTopics.map((topic, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleTopicClick(topic.text)}
                      className="flex flex-col items-start gap-2 p-4 rounded-lg border border-green-200 hover:bg-green-50 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-3 text-green-700">
                        {topic.icon}
                        <span className="font-medium group-hover:text-green-800">{topic.text}</span>
                      </div>
                      <span className="text-sm text-gray-500 pl-8">{topic.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div
                  className={`rounded-lg px-4 py-3 max-w-[85%] shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-green-100 text-green-900'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="font-semibold mb-1 text-sm text-gray-700">
                    {msg.role === 'user' ? 'You' : 'Hausasoft AI'}
                  </div>
                  <div className="whitespace-pre-wrap text-base leading-relaxed">
                    {msg.role === 'ai' ? msg.text.replace(/[\*_\/]/g, '') : msg.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="mt-4">
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 rounded-lg border border-green-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                placeholder="Ask any question or type a topic to learn about..."
                value={input}
                onChange={handleInputChange}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </div>
            {error && (
              <div className="mt-2 text-center text-red-500 text-sm bg-red-50 p-2 rounded">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LearnWithAIPage; 