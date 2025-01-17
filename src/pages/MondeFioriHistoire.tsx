import React, { Suspense } from 'react';
import TopNavbar from '../components/TopNavbar';
import BrandNavbarSection from '../components/productsPages/BrandNavbarSection';
import MainNavbar from '@/components/MainNavbar';
import Footer from '../components/Footer';
import WhatsAppPopup from '@/components/WhatsAppPopup';

const MondeFioriHistoire = () => {
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
                Notre Histoire
              </h1>
              <div className="text-lg text-gray-600 space-y-4">
                <p>
                  Fiori, fondée en 2014, est une marque tunisienne qui s'intègre dans l'univers du prêt-à-porter 
                  et de la maroquinerie haut de gamme pour homme.
                </p>
                <p>
                  En suivant les normes de production les plus poussées, nos pièces uniques sont travaillées à partir 
                  de matières raffinées et soigneusement choisies pour créer des modèles qui renouent avec l'élégance 
                  et la légèreté, tout en maîtrisant chaque détail, de la production à la livraison à notre clientèle, 
                  dans des conditions hyper-soignées.
                </p>
                <p>
                  Nous nous distinguons par la qualité de nos produits, réalisés avec des matériaux 100% naturels 
                  en général, tels que la laine, le coton et le lin.
                </p>
                <p>
                  En 2020, nous avons développé une nouvelle ligne proposant une gamme de coffrets cadeaux avec une 
                  touche de personnalisation qui exprime au mieux ce qu'est le luxe aujourd'hui : la créativité et 
                  la différenciation.
                </p>
              </div>
            </div>
            <div className="relative h-[600px] w-full">
              <img 
                  src="/About.png"
                alt="Fiori Histoire"
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

export default MondeFioriHistoire;