import React from 'react';
import TopNavbar from '../components/TopNavbar';
import BrandNavbarSection from '../components/productsPages/BrandNavbarSection';
import MainNavbarProduct from '../components/MainNavbarProduct';
import Footer from '../components/Footer';
import ProductsSection from '../components/productsPages/ProductsSection';
import BeltsSection from '@/components/productsPages/BeltsSection';
import MainNavbar from '@/components/MainNavbar';

const MondeFioriDNA = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col relative">
    <TopNavbar />
    <BrandNavbarSection />
    <div className="hidden lg:block">
      <MainNavbar/>
    </div>
    <div className="lg:mt-[0.5%] mt-[-15%]">
    <BeltsSection />
    </div>
      <Footer />
    </div>
  );
};

export default MondeFioriDNA;