import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TopNavbar from '@/components/TopNavbar';
import Footer from '@/components/Footer';
import BrandNavbarSection from '@/components/productsPages/BrandNavbarSection';
import MainNavbar from '@/components/MainNavbar';
import WelcomePackTrio from '@/components/GiftApp/WelcomePackTrio';
import WelcomePackDuo from '@/components/GiftApp/WelcomePackDuo';
import { GiftBox } from './GiftBox';
import GiftApp from '@/components/GiftApp/GiftApp';
import WelcomePackPremium from '@/components/GiftApp/WelcomePackPremium';
import WelcomePackPrestige from '@/components/GiftApp/WelcomePackPrestige';
import WelcomePackMiniDuo from '@/components/GiftApp/WelcomePackMiniDuo';
import WelcomePackChemise from '@/components/GiftApp/WelcomePackChemise';

const GiftUniversePage = () => {
  const [showGiftBox, setShowGiftBox] = useState(false);
  const [showNewPage, setShowNewPage] = useState(false);
  const location = useLocation();
  const [currentComponent, setCurrentComponent] = useState(null);

  useEffect(() => {
    const routePath = location.pathname;
    const lastSegment = routePath.substring(routePath.lastIndexOf('/') + 1);

    const componentMap = {
      packprestige: <WelcomePackPrestige onCompose={() => setShowGiftBox(true)} />,
      packpremium: <WelcomePackPremium onCompose={() => setShowGiftBox(true)} />,
      packpremuim: <WelcomePackPremium onCompose={() => setShowGiftBox(true)} />, // Added to handle the typo
      packtrio: <WelcomePackTrio onCompose={() => setShowGiftBox(true)} />,
      packduo: <WelcomePackDuo onCompose={() => setShowGiftBox(true)} />,
      packminiduo: <WelcomePackMiniDuo onCompose={() => setShowGiftBox(true)} />,
      packchemise: <WelcomePackChemise onCompose={() => setShowGiftBox(true)} />,
    };

    setCurrentComponent(componentMap[lastSegment] || null);
    
    if (!componentMap[lastSegment]) {
      console.warn(`No matching component found for route: ${lastSegment}`);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-[#f6f7f9]">
      <TopNavbar />
      <BrandNavbarSection />
      <div className="hidden lg:block">
        <MainNavbar />
      </div>
      <br />
      <div className="lg:mt-[0.5%] mt-[-15%]">
        {showNewPage ? (
          <GiftApp />
        ) : showGiftBox ? (
          <GiftBox onAnimationComplete={() => setShowNewPage(true)} />
        ) : (
          currentComponent || (
            <div className="text-center p-8">
              <h2 className="text-2xl font-semibold text-gray-800">Pack non trouvé</h2>
              <p className="text-gray-600 mt-2">Le pack que vous recherchez n'existe pas.</p>
            </div>
          )
        )}
      </div>
      <Footer />
    </div>
  );
};

export default GiftUniversePage;