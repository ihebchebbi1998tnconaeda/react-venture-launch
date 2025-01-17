import React, { useState, useEffect, Suspense } from 'react';
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
import WelcomePackCeinture from '@/components/GiftApp/WelcomePackCeinture';
import WelcomePackCravatte from '@/components/GiftApp/WelcomePackCravatte';
import WelcomePackMalette from '@/components/GiftApp/WelcomePackMalette';
import WelcomePackPortefeuille from '@/components/GiftApp/WelcomePackPortefeuille';
import WelcomePackPorteCarte from '@/components/GiftApp/WelcomePackPorteCarte';
import WelcomePackPorteCle from '@/components/GiftApp/WelcomePackPorteCle';
import WhatsAppPopup from '@/components/WhatsAppPopup';

const GiftUniversePage = () => {
  const [showGiftBox, setShowGiftBox] = useState(false);
  const [showNewPage, setShowNewPage] = useState(false);
  const location = useLocation();
  const [currentComponent, setCurrentComponent] = useState(null);

  useEffect(() => {
    const routePath = location.pathname;
    const lastSegment = routePath.substring(routePath.lastIndexOf('/') + 1);

    // Map route segments to pack types
    const packTypeMap = {
      packprestige: 'Pack Prestige',
      packpremium: 'Pack Premium',
      packpremuim: 'Pack Premium', // Handle typo in route
      packtrio: 'Pack Trio',
      packduo: 'Pack Duo',
      packminiduo: 'Pack Mini Duo',
      packchemise: 'Pack Chemise',
      packceinture: 'Pack Ceinture',
      packcravatte: 'Pack Cravatte',
      packmalette: 'Pack Malette',
      packportefeuille: 'Pack Portefeuille',
      packportecarte: 'Pack Porte-carte',
      packportecle: 'Pack Porte-clé',
    };

    // Set the pack type in sessionStorage
    const packType = packTypeMap[lastSegment];
    if (packType) {
      console.log('Setting pack type:', packType);
      sessionStorage.setItem('selectedPackType', packType);
    }

    const componentMap = {
      packprestige: <WelcomePackPrestige onCompose={() => setShowGiftBox(true)} />,
      packpremium: <WelcomePackPremium onCompose={() => setShowGiftBox(true)} />,
      packpremuim: <WelcomePackPremium onCompose={() => setShowGiftBox(true)} />,
      packtrio: <WelcomePackTrio onCompose={() => setShowGiftBox(true)} />,
      packduo: <WelcomePackDuo onCompose={() => setShowGiftBox(true)} />,
      packminiduo: <WelcomePackMiniDuo onCompose={() => setShowGiftBox(true)} />,
      packchemise: <WelcomePackChemise onCompose={() => setShowGiftBox(true)} />,
      packceinture: <WelcomePackCeinture onCompose={() => setShowGiftBox(true)} />,
      packcravatte: <WelcomePackCravatte onCompose={() => setShowGiftBox(true)} />,
      packmalette: <WelcomePackMalette onCompose={() => setShowGiftBox(true)} />,
      packportefeuille: <WelcomePackPortefeuille onCompose={() => setShowGiftBox(true)} />,
      packportecarte: <WelcomePackPorteCarte onCompose={() => setShowGiftBox(true)} />,
      packportecle: <WelcomePackPorteCle onCompose={() => setShowGiftBox(true)} />,
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
      <Suspense fallback={null}>
                      <WhatsAppPopup />
   </Suspense>
      <Footer />
    </div>
  );
};

export default GiftUniversePage;