import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useCart } from './cart/CartProvider';
import axios from 'axios';
import InfoModal from './modals/InfoModal';
import FAQModal from './modals/FAQModal';
import { useLocation } from 'react-router-dom';

const Footer = () => {
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
          title: "Désolé",
          description: "Cette adresse email a déjà bénéficié de la réduction de 5%.",
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
          title: "Inscription réussie !",
          description: "Merci de vous être inscrit à notre newsletter. Votre réduction de 5% a été appliquée à votre panier.",
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
          title: "Déjà inscrit",
          description: "Vous êtes déjà inscrit à notre newsletter.",
          duration: 3000,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.",
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
          <p className="text-sm font-medium">Abonnez-vous aujourd'hui et obtenez 5% de réduction sur votre premier achat</p>
          <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre email"
              className="px-4 py-2 rounded-md border border-gray-300 flex-1 md:w-[280px] text-sm"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#700100] text-white px-6 py-2 rounded-md text-sm hover:bg-[#700100]/90"
            >
              S'abonner
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-8">
          {/* Contact Us */}
          <div>
            <h3 className="font-semibold text-sm mb-4">CONTACTEZ-NOUS</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <button onClick={handleWhatsAppContact} className="hover:underline">
                  +216 29 509 840
                </button>
              </li>
              <li>
                <button onClick={handleWhatsAppContact} className="hover:underline">
                  Envoyez-nous un email
                </button>
              </li>
              <li>
                <button onClick={handleWhatsAppContact} className="hover:underline">
                  Chat en direct
                </button>
              </li>
            </ul>
            <p className="mt-6 mb-3 text-sm">Suivez-nous</p>
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
            <h3 className="font-semibold text-sm mb-4">À PROPOS</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setShowFioriModal(true)} className="hover:underline">Qu'est-ce que Fiori</button></li>
              <li><button onClick={() => setShowImpactModal(true)} className="hover:underline">Rapport d'impact</button></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-sm mb-4">SERVICE CLIENT</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={handleWhatsAppContact} className="hover:underline">Nous contacter</button></li>
              <li><button onClick={() => setShowDeliveryModal(true)} className="hover:underline">Informations de livraison</button></li>
              <li><button onClick={() => setShowFAQModal(true)} className="hover:underline">FAQ</button></li>
              <li><button onClick={() => setShowReturnModal(true)} className="hover:underline">Politique de retour</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">NOS PAGES</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/monde-fiori/histoire" className="hover:underline">Le monde Fiori</a></li>
              <li><a href="/univers-cadeaux" className="hover:underline">L'univers Cadeaux</a></li>
              <li><a href="/category/pret-a-porter/homme/costumes" className="hover:underline">Le prét à porter</a></li>
              <li><a href="/category/accessoires/homme/portefeuilles" className="hover:underline">Accessoires</a></li>
              <li><a href="/sur-mesure" className="hover:underline">Le sur mesure</a></li>
              <li><a href="/category/outlet/femme/chemises" className="hover:underline">Outlet</a></li>
            </ul>
            <div className="mt-8">
              <div className="mb-4">
                <p className="text-sm mb-2">Livraison mondiale</p>
                <img src="https://i.ibb.co/pPLzH9L/image.png" alt="World Wide Delivery" className="h-8" />
              </div>
              <p className="text-sm mb-2">Nous acceptons</p>
              <div className="flex gap-2 items-center">
                <img src="https://i.ibb.co/JnwRLrJ/visa-and-mastercard-logos-logo-visa-png-logo-visa-mastercard-png-visa-logo-white-png-awesome-logos.png" alt="Mastercard" className="h-7" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© 2024 FioriForYou</p>
          <p className="text-xs">
            Fait avec ❤️ en Tunisie {isIhebChebbi() ? (
              <>par <a href="https://ihebchebbi.pro/" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">Iheb Chebbi</a></>
            ) : (
              <>par <a href="https://ihebchebbi.pro/" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">Iheb Chebbi</a></>
            )}
          </p>
        </div>
      </div>

      {/* Modals */}
      <InfoModal
        isOpen={showFioriModal}
        onOpenChange={setShowFioriModal}
        title="Qu'est-ce que Fiori ?"
        content="Fiori est une marque de mode masculine tunisienne qui incarne l'élégance et le raffinement. Nous créons des vêtements et accessoires de haute qualité, alliant savoir-faire traditionnel et design contemporain. Notre mission est d'offrir à chaque homme les moyens d'exprimer sa personnalité à travers un style unique et sophistiqué."
      />

      <InfoModal
        isOpen={showImpactModal}
        onOpenChange={setShowImpactModal}
        title="Rapport d'impact"
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