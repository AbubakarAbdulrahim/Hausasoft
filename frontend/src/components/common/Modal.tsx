import React from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  type?: 'success' | 'error';
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children, type = 'success' }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className={`rounded-lg shadow-lg max-w-xs w-full p-4 border-t-4 relative 
        ${type === 'success' ? 'bg-green-50/80 border-green-400' : 'bg-red-50/80 border-red-400'}`}>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl font-bold">&times;</button>
        <div className={`text-center text-base font-medium ${type === 'success' ? 'text-green-800' : 'text-red-800'}`}>{children}</div>
      </div>
    </div>
  );
};

export default Modal; 