import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hoverEffect = true }) => {
  return (
    <div
      className={`card ${
        hoverEffect ? 'transition-transform hover:translate-y-[-4px]' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;