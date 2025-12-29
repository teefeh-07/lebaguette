import React from 'react';
import './MintButton.css';

interface MintButtonProps {
  children?: React.ReactNode;
}

export const MintButton: React.FC<MintButtonProps> = ({ children }) => {
  return (
    <div className="mintbutton-container">
      {children}
    </div>
  );
};
