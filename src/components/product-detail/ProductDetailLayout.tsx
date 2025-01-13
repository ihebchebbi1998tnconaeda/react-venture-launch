import React from 'react';
import TopNavbar from '@/components/TopNavbar';
import BrandNavbarSection from '@/components/productsPages/BrandNavbarSection';
import MainNavbarProductDetails from '@/components/MainNavbarProductDetails';
import Footer from '@/components/Footer';

interface ProductDetailLayoutProps {
  children: React.ReactNode;
  onBack: () => void;
}

const ProductDetailLayout = ({ children, onBack }: ProductDetailLayoutProps) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopNavbar />
      <BrandNavbarSection />
      <div className="hidden lg:block">
        <MainNavbarProductDetails />
      </div>
      <main className="flex-grow lg:mt-[1%] mt-[-13%]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-[#700100] transition-colors mb-6 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Retour aux produits</span>
          </button>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailLayout;