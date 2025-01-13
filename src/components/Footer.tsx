import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useCart } from './cart/CartProvider';
import axios from 'axios';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { applyNewsletterDiscount } = useCart();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('https://respizenmedical.com/fiori/subscribe_email.php', {
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
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Erreur d\'inscription à la newsletter:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-white text-gray-800">
      {/* Barre Newsletter */}
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

      {/* Contenu Principal du Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-8">
          {/* Contactez-nous */}
          <div>
            <h3 className="font-semibold text-sm mb-4">CONTACTEZ-NOUS</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <a href="https://wa.me/21629509840" target="_blank" rel="noopener noreferrer" className="inline-block">
                  +216 29 509 840
                </a>
              </li>
              <li>
                <a href="mailto:contact@fioriforyou.com" className="hover:underline flex items-center gap-2">
                  <span>Envoyez-nous un email</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/21629509840" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2">
                  <span>Chat en direct</span>
                </a>
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

          {/* À propos */}
          <div>
            <h3 className="font-semibold text-sm mb-4">À PROPOS</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Qu'est-ce que Fiori</a></li>
              <li><a href="#" className="hover:underline">Rapport d'impact</a></li>
              <li><a href="#" className="hover:underline">Prêt à vendre sur Fiori ?</a></li>
            </ul>
          </div>

          {/* Service Client */}
          <div>
            <h3 className="font-semibold text-sm mb-4">SERVICE CLIENT</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Nous contacter</a></li>
              <li><a href="#" className="hover:underline">Informations de livraison</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
              <li><a href="#" className="hover:underline">Politique de retour</a></li>
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
              <p className="text-sm mb-2">Nous acceptons</p>
              <div className="flex gap-2">
                <img src="https://i.ibb.co/JnwRLrJ/visa-and-mastercard-logos-logo-visa-png-logo-visa-mastercard-png-visa-logo-white-png-awesome-logos.png" alt="Mastercard" className="h-7" />
              </div>
            </div>
          </div>
        </div>

        {/* Barre du Bas */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© 2024 FioriForYou</p>
          <p className="text-xs">Fait avec ❤️ en Tunisia par <strong>Holastudie</strong></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;