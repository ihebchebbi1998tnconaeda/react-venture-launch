import React, { useState } from 'react';
import { FaWhatsapp } from "react-icons/fa";
import FAQModal from './modals/FAQModal';
import InfoModal from './modals/InfoModal';

const Footer = () => {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);
  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+21629509840', '_blank');
  };

  return (
    <footer className="bg-[#471818] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">À propos de Fiori</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setIsAboutModalOpen(true)}
                  className="hover:text-gray-300 transition-colors"
                >
                  Qu'est-ce que Fiori
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsFAQModalOpen(true)}
                  className="hover:text-gray-300 transition-colors"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Service Client</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setIsShippingModalOpen(true)}
                  className="hover:text-gray-300 transition-colors"
                >
                  Informations de livraison
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsReturnModalOpen(true)}
                  className="hover:text-gray-300 transition-colors"
                >
                  Politique de retour
                </button>
              </li>
              <li>
                <button 
                  onClick={handleWhatsAppClick}
                  className="flex items-center gap-2 hover:text-gray-300 transition-colors"
                >
                  <FaWhatsapp />
                  Nous contacter
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Nos Boutiques</h3>
            <p>Tunisia Mall</p>
            <p>Les Berges du Lac</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              {/* Social media icons */}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} Fiori. Tous droits réservés.</p>
        </div>
      </div>

      <InfoModal
        isOpen={isAboutModalOpen}
        onOpenChange={setIsAboutModalOpen}
        title="Qu'est-ce que Fiori"
        content="Fiori est une marque de prêt-à-porter haut de gamme tunisienne, spécialisée dans la confection de vêtements sur mesure et de qualité supérieure. Notre engagement envers l'excellence artisanale et notre passion pour la mode nous permettent de créer des pièces uniques qui allient style, confort et élégance."
      />

      <FAQModal
        isOpen={isFAQModalOpen}
        onOpenChange={setIsFAQModalOpen}
      />

      <InfoModal
        isOpen={isShippingModalOpen}
        onOpenChange={setIsShippingModalOpen}
        title="Informations de livraison"
        content="Nous offrons la livraison gratuite pour toute commande supérieure à 299 TND. Les délais de livraison varient entre 24h et 72h selon votre localisation. Nos colis sont soigneusement préparés et emballés pour garantir la protection optimale de vos articles pendant le transport."
      />

      <InfoModal
        isOpen={isReturnModalOpen}
        onOpenChange={setIsReturnModalOpen}
        title="Politique de retour"
        content="Nous acceptons les retours dans un délai de 14 jours suivant la réception de votre commande. Les articles doivent être retournés dans leur état d'origine, non portés et avec toutes les étiquettes attachées. Les frais de retour sont à la charge du client. Le remboursement sera effectué dans les 7 jours ouvrables suivant la réception du retour."
      />
    </footer>
  );
};

export default Footer;
