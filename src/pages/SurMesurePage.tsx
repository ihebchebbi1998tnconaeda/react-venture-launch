import React from 'react';
import TopNavbar from '../components/TopNavbar';
import BrandNavbarSection from '../components/productsPages/BrandNavbarSection';
import MainNavbar from '@/components/MainNavbar';
import Footer from '../components/Footer';
import BeltsSection from '@/components/productsPages/BeltsSection';

const SurMesurePage = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col relative">
      <TopNavbar />
      <BrandNavbarSection />
      <div className="hidden lg:block">
        <MainNavbar />
      </div>
      <div className="lg:mt-[0.5%] mt-[-15%]">
    <BeltsSection />
    </div>
      <Footer />
    </div>
  );
};

export default SurMesurePage;