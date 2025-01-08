import React from 'react';
import TopNavbar from '../components/TopNavbar';
import BrandNavbarSection from '../components/productsPages/BrandNavbarSection';
import MainNavbarProduct from '../components/MainNavbarProduct';
import Footer from '../components/Footer';
import ProductsSection from '../components/productsPages/ProductsSection';
import MainNavbar from '@/components/MainNavbar';
import BeltsSection from '@/components/productsPages/BeltsSection';

const MondeFioriHistoire = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col relative">
    <TopNavbar />
    <BrandNavbarSection />
    <div className="hidden lg:block">
      <MainNavbar/>
    </div>
    <BeltsSection />
      <Footer />
    </div>
  );
};
export default MondeFioriHistoire;