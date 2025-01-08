import React from 'react';

const BrandNavbar = () => {
  return (
    <div className="glass-effect absolute w-full z-10 text-center py-3 mb-8">
      <div className="relative container mx-auto px-4">
        <img 
          src="logowhite.svg" 
          alt="FIORI Logo" 
          className="mx-auto h-8" 
        />
      </div>
    </div>
  );
};

export default BrandNavbar;
