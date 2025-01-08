import React from 'react';
import { Link } from 'react-router-dom';

const BrandNavbarSection = () => {
  return (
    <div className="bg-[#EFEDED] w-full z-10 text-center py-1 mb-16">
      <div className="relative container mx-auto px-4">
        <Link to="/">
          <img
            src="https://i.ibb.co/f1DxdcW/logoblack.png"
            alt="FIORI Logo"
            className="mx-auto h-[5.7rem]"
          />
        </Link>
      </div>
    </div>
  );
};

export default BrandNavbarSection;