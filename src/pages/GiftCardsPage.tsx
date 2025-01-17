import React, { Suspense } from 'react';
import TopNavbar from '../components/TopNavbar';
import BrandNavbarSection from '../components/productsPages/BrandNavbarSection';
import MainNavbar from '@/components/MainNavbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import WhatsAppPopup from '@/components/WhatsAppPopup';

const GiftCardsPage = () => {
  return (
    <div className="min-h-screen bg-[#f6f7f9] flex flex-col relative">
      <TopNavbar />
      <BrandNavbarSection />
      <div className="hidden lg:block">
        <MainNavbar/>
      </div>
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-light tracking-tight text-gray-900">
                Cartes Cadeaux Fiori
              </h1>
              <div className="text-lg text-gray-600 space-y-4">
                <p>
                  Offrez l'élégance avec une carte cadeau Fiori. Le cadeau idéal pour permettre 
                  à vos proches de choisir parmi notre collection exclusive de vêtements et accessoires.
                </p>
                <p>
                  Disponible en plusieurs montants, nos cartes cadeaux sont présentées dans un 
                  packaging luxueux et peuvent être personnalisées avec un message spécial.
                </p>
                <p>
                  Valable dans toutes nos boutiques et sur notre site web pendant un an, 
                  c'est le cadeau parfait pour toutes les occasions.
                </p>
              </div>
              <Button 
                className="bg-[#700100] hover:bg-[#8B0000] text-white px-8 py-6 text-lg"
              >
                Pré-commander
              </Button>
            </div>
            <div className="relative h-[600px] w-full">
              <img 
                src="/GiftCards.png"
                alt="Fiori Gift Cards"
                className="w-full h-full object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
      <Suspense fallback={null}>
                      <WhatsAppPopup />
   </Suspense>
      <Footer />
    </div>
  );
};

export default GiftCardsPage;