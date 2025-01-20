import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useCart } from './cart/CartProvider';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import InfoModal from './modals/InfoModal';
import FAQModal from './modals/FAQModal';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { applyNewsletterDiscount } = useCart();
  const location = useLocation();
  
  // Modal states
  const [showAProposModal, setShowAProposModal] = useState(false);
  const [showFioriModal, setShowFioriModal] = useState(false);
  const [showImpactModal, setShowImpactModal] = useState(false);
  const [showFAQModal, setShowFAQModal] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);

  // Check if user entered through /new on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true');
      if (location.pathname === '/new') {
        localStorage.setItem('enteredThroughNew', 'true');
      }
    }
  }, [location.pathname]);

  const isIhebChebbi = () => {
    return location.pathname === '/new' || localStorage.getItem('enteredThroughNew') === 'true';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check if email has already used discount
      const usedDiscountEmails = JSON.parse(localStorage.getItem('usedDiscountEmails') || '[]');
      if (usedDiscountEmails.includes(email)) {
        toast({
          variant: "destructive",
          title: t('newsletter.alreadySubscribed'),
          description: t('newsletter.alreadySubscribedMessage'),
          duration: 3000,
        });
        setIsLoading(false);
        return;
      }

      const response = await axios.post('https://www.fioriforyou.com/backfiori/subscribe_email.php', {
        email
      });

      if (response.data.status === 'success') {
        applyNewsletterDiscount();
        toast({
          title: t('newsletter.success'),
          description: t('newsletter.successMessage'),
          duration: 3000,
        });
        setEmail('');
      } else {
        throw new Error(response.data.message || "Erreur d'inscription");
      }
    } catch (error: any) {
      console.error('Erreur d\'inscription à la newsletter:', error);
      const errorMessage = error.response?.data?.message || error.message;
      
      if (errorMessage.includes('already exists')) {
        toast({
          variant: "destructive",
          title: t('newsletter.alreadySubscribed'),
          description: t('newsletter.alreadySubscribedMessage'),
          duration: 3000,
        });
      } else {
        toast({
          variant: "destructive",
          title: t('newsletter.error'),
          description: t('newsletter.errorMessage'),
          duration: 3000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/21629509840', '_blank');
  };

  return (
    <footer className="bg-white text-gray-800">
      {/* Newsletter Bar */}
      <div className="border-y border-gray-200">
        <div className="container mx-auto px-4 py-3.5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-medium">{t('newsletter.subscribe')}</p>
          <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('newsletter.placeholder')}
              className="px-4 py-2 rounded-md border border-gray-300 flex-1 md:w-[280px] text-sm"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#700100] text-white px-6 py-2 rounded-md text-sm hover:bg-[#700100]/90"
            >
              {t('newsletter.button')}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-8">
          {/* Contact Us */}
          <div>
            <h3 className="font-semibold text-sm mb-4">{t('contactSection.title')}</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <button onClick={handleWhatsAppContact} className="hover:underline">
                  +216 29 509 840
                </button>
              </li>
              <li>
                <button onClick={handleWhatsAppContact} className="hover:underline">
                  {t('contactSection.email')}
                </button>
              </li>
              <li>
                <button onClick={handleWhatsAppContact} className="hover:underline">
                  {t('contactSection.chat')}
                </button>
              </li>
            </ul>
            <p className="mt-6 mb-3 text-sm">{t('contactSection.followUs')}</p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/fioriforyou/" target="_blank" rel="noopener noreferrer" className="text-[#700100]">
                <i className="fab fa-instagram" style={{ fontSize: '1.44rem' }}></i>
              </a>
              <a href="https://www.facebook.com/FioriForYouMen" target="_blank" rel="noopener noreferrer" className="text-[#700100]">
                <i className="fab fa-facebook" style={{ fontSize: '1.44rem' }}></i>
              </a>
              <a href="https://www.youtube.com/@fioriforyou" target="_blank" rel="noopener noreferrer" className="text-[#700100]">
                <i className="fab fa-youtube" style={{ fontSize: '1.44rem' }}></i>
              </a>
              <a href="https://www.tiktok.com/@fioriforyou" target="_blank" rel="noopener noreferrer" className="text-[#700100]">
                <i className="fab fa-tiktok" style={{ fontSize: '1.44rem' }}></i>
              </a>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-sm mb-4">{t('aboutSection.title')}</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setShowFioriModal(true)} className="hover:underline">{t('aboutSection.whatIsFiori')}</button></li>
              <li><button onClick={() => setShowImpactModal(true)} className="hover:underline">{t('aboutSection.impactReport')}</button></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-sm mb-4">{t('customerService.title')}</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={handleWhatsAppContact} className="hover:underline">{t('customerService.contact')}</button></li>
              <li><button onClick={() => setShowDeliveryModal(true)} className="hover:underline">{t('customerService.delivery')}</button></li>
              <li><button onClick={() => setShowFAQModal(true)} className="hover:underline">{t('customerService.faq')}</button></li>
              <li><button onClick={() => setShowReturnModal(true)} className="hover:underline">{t('customerService.returns')}</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">{t('ourPages.title')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/monde-fiori/histoire" className="hover:underline">{t('ourPages.fioriWorld')}</a></li>
              <li><a href="/univers-cadeaux" className="hover:underline">{t('ourPages.giftUniverse')}</a></li>
              <li><a href="/category/pret-a-porter/homme/costumes" className="hover:underline">{t('ourPages.readyToWear')}</a></li>
              <li><a href="/category/accessoires/homme/portefeuilles" className="hover:underline">{t('ourPages.accessories')}</a></li>
              <li><a href="/sur-mesure" className="hover:underline">{t('ourPages.surMesure')}</a></li>
              <li><a href="/category/outlet/femme/chemises" className="hover:underline">{t('ourPages.outlet')}</a></li>
            </ul>
            <div className="mt-8">
              <div className="mb-4">
                <p className="text-sm mb-2">{t('payment.worldwideDelivery')}</p>
                <img src="https://i.ibb.co/pPLzH9L/image.png" alt="World Wide Delivery" className="h-8" />
              </div>
              <p className="text-sm mb-2">{t('payment.weAccept')}</p>
              <div className="flex gap-2 items-center">
                <img src="https://i.ibb.co/JnwRLrJ/visa-and-mastercard-logos-logo-visa-png-logo-visa-mastercard-png-visa-logo-white-png-awesome-logos.png" alt="Mastercard" className="h-7" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>{t('copyright')}</p>
          <p className="text-xs">
            {t('madeWith')} <a href="https://ihebchebbi.pro/" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">Iheb Chebbi</a>
          </p>
        </div>
      </div>

      {/* Modals */}
      <InfoModal
        isOpen={showFioriModal}
        onOpenChange={setShowFioriModal}
        title={t('aboutSection.whatIsFiori')}
        content="Fiori est une marque de mode masculine tunisienne qui incarne l'élégance et le raffinement. Nous créons des vêtements et accessoires de haute qualité, alliant savoir-faire traditionnel et design contemporain. Notre mission est d'offrir à chaque homme les moyens d'exprimer sa personnalité à travers un style unique et sophistiqué."
      />

      <InfoModal
        isOpen={showImpactModal}
        onOpenChange={setShowImpactModal}
        title={t('aboutSection.impactReport')}
        content="Chez Fiori, nous nous engageons pour un impact positif sur notre communauté et notre environnement. Nous collaborons avec des artisans locaux, utilisons des matériaux durables et soutenons diverses initiatives sociales. Notre rapport d'impact détaille nos actions en faveur d'une mode plus responsable et éthique."
      />

      <InfoModal
        isOpen={showDeliveryModal}
        onOpenChange={setShowDeliveryModal}
        title="Informations de livraison"
        content="Nous livrons dans toute la Tunisie sous 2-5 jours ouvrables. La livraison est gratuite pour toute commande supérieure à 200 DT. Pour les commandes internationales, le délai de livraison est de 5-10 jours ouvrables. Nous vous informerons par email dès que votre commande sera expédiée."
      />

      <InfoModal
        isOpen={showReturnModal}
        onOpenChange={setShowReturnModal}
        title="Politique de retour"
        content="Nous acceptons les retours dans un délai de 14 jours suivant la réception de votre commande. Les articles doivent être dans leur état d'origine, non portés et avec toutes les étiquettes attachées. Les frais de retour sont à la charge du client. Le remboursement sera effectué sous 7 jours ouvrables après réception du retour."
      />

      <FAQModal
        isOpen={showFAQModal}
        onOpenChange={setShowFAQModal}
      />
    </footer>
  );
};

export default Footer;
