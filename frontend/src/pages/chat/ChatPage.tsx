import React from 'react';
import { ChatProvider } from '../../contexts/ChatContext';
import { ChatBox } from '../../components/chat/ChatBox';
import './ChatPage.css';

export const ChatPage: React.FC = () => {
  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="chat-header">
          <h1>Learn with AI</h1>
          <p>Ask questions and get instant help with your studies</p>
        </div>
        <ChatProvider>
          <ChatBox />
        </ChatProvider>
      </div>
    </div>
  );
}; 