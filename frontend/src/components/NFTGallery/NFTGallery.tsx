import React from 'react';
import './NFTGallery.css';

interface NFTGalleryProps {
  children?: React.ReactNode;
}

export const NFTGallery: React.FC<NFTGalleryProps> = ({ children }) => {
  return (
    <div className="nftgallery-container">
      {children}
    </div>
  );
};
