import React, { Suspense } from 'react';
import TopNavbar from '../components/TopNavbar';
import BrandNavbarSection from '../components/productsPages/BrandNavbarSection';
import MainNavbar from '@/components/MainNavbar';
import Footer from '../components/Footer';
import WhatsAppPopup from '@/components/WhatsAppPopup';

const MondeFioriCollection = () => {
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
                Notre Collection
              </h1>
              <div className="text-lg text-gray-600 space-y-4">
                <p>
                  La collection Fiori s'inspire généralement d'un mélange entre l'élégance intemporelle et les 
                  tendances contemporaines. Chaque pièce est conçue pour raconter une histoire, alliant le 
                  savoir-faire artisanal à l'innovation en suivant les dernières tendances dans le monde de la 
                  mode italienne.
                </p>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Matériaux et Textures</h3>
                  <p>Les matériaux utilisés reflètent l'excellence :</p>
                  <ul className="list-disc pl-5 mt-2">
                    <li>Tissus : Cachemire, laine mérinos, soie, cuir pleine fleur et coton égyptien.</li>
                    <li>Textures : Finitions mates, satinées ou légèrement texturées.</li>
                    <li>Détails : Doublures contrastées en soie, boutons en nacre ou en corne.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Silhouettes et Coupes</h3>
                  <ul className="list-disc pl-5">
                    <li>Costumes : Tailoring impeccable avec des coupes ajustées.</li>
                    <li>Casual Chic : Chemises fluides, pantalons plissés.</li>
                    <li>Outerwear : Manteaux longs à double boutonnage.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative h-[600px] w-full">
              <img 
                src="/NotreCollectionAbout.jpg"
                alt="Fiori Collection"
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

export default MondeFioriCollection;