import { CreditCard, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="font-serif text-xl font-bold">ELLES</h3>
            <p className="mt-4 text-sm text-gray-300">
              Votre partenaire en vêtements professionnels depuis 2010.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-lg font-semibold">Navigation</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-gray-300 hover:text-white">Accueil</a></li>
              <li><a href="#products" className="text-sm text-gray-300 hover:text-white">Boutique</a></li>
              <li><a href="#about" className="text-sm text-gray-300 hover:text-white">À Propos</a></li>
              <li><a href="#faq" className="text-sm text-gray-300 hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg font-semibold">Paiement Sécurisé</h4>
            <div className="mt-4 flex items-center space-x-4">
              <CreditCard className="h-8 w-8" />
              <span className="text-sm text-gray-300">
                Paiement 100% sécurisé
              </span>
            </div>
          </div>
          <div>
            <h4 className="font-serif text-lg font-semibold">Suivez-nous</h4>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2024 ELLES. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;