import React from 'react';
import { X, MapPin, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SubMenuSectionMobile from './SubMenuSectionMobile';
import { Link, useLocation } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: any[];
  expandedItem: string | null;
  onToggleSubmenu: (title: string) => void;
  onStoreClick: () => void;
  onContactClick: () => void;
}

const MobileMenu = ({
  isOpen,
  onClose,
  menuItems,
  expandedItem,
  onToggleSubmenu,
  onStoreClick,
  onContactClick,
}: MobileMenuProps) => {
  const location = useLocation();

  const handleLinkClick = (href: string, callback?: () => void) => {
    if (href && href !== "#" && href !== location.pathname && href !== "/univers-cadeaux") {
      if (callback) {
        callback();
      }
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-0 left-0 h-full bg-[#700100] w-[75vw] max-w-[360px] z-50 overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-2xl font-semibold text-white tracking-wider">Menu</h2>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="text-white/80 hover:text-white transition-colors duration-300"
            >
              <X size={28} />
            </button>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-5rem)] hide-scrollbar">
            <ul className="p-4 space-y-2">
              <li className="text-white">
                <div className="group">
                  <SubMenuSectionMobile
                    title="Le monde Fiori"
                    items={[
                      { href: "/monde-fiori/histoire", title: "Histoire", description: "Notre histoire" },
                      { href: "/monde-fiori/collection", title: "Collection", description: "Nos collections" },
                      { href: "/monde-fiori/dna", title: "DNA", description: "Notre ADN" }
                    ]}
                    onClick={(href) => handleLinkClick(href)}
                  />
                </div>
              </li>

              <li className="text-white/90">
                <div className="group">
                  <SubMenuSectionMobile
                    title="L'univers Cadeaux"
                    items={[
                      { href: "/univers-cadeaux", title: "L'univers Cadeaux", description: "À propos" },
                      { href: "/univers-cadeaux/packprestige", title: "Pack Prestige", description: "Notre collection prestige" },
                      { href: "/univers-cadeaux/packpremuim", title: "Pack Premium", description: "Collection premium" },
                      { href: "/univers-cadeaux/packtrio", title: "Pack Trio", description: "Ensemble de trois pièces" },
                      { href: "/univers-cadeaux/packduo", title: "Pack Duo", description: "Ensemble de deux pièces" },
                      { href: "/univers-cadeaux/packminiduo", title: "Pack Mini Duo", description: "Petit ensemble duo" }
                    ]}
                    onClick={(href) => handleLinkClick(href)}
                  />
                </div>
              </li>

              <li className="text-white/90">
                <div className="group">
                  <SubMenuSectionMobile
                    title="Le prêt à porter"
                    items={[
                      { href: "/category/pret-a-porter/homme/costumes", title: "Costume", description: "Costumes élégants" },
                      { href: "/category/pret-a-porter/homme/blazers", title: "Blazer", description: "Blazers raffinés" },
                      { href: "/category/pret-a-porter/homme/vestes", title: "Vestes", description: "Vestes élégantes" },
                      { href: "/category/pret-a-porter/homme/chemises", title: "Chemise", description: "Chemises classiques" },
                      { href: "/category/pret-a-porter/homme/pantalons", title: "Pantalon", description: "Pantalons élégants" },
                      { href: "/category/pret-a-porter/homme/pollo", title: "Polo", description: "Polos élégants" }
                    ]}
                    onClick={(href) => handleLinkClick(href)}
                  />
                </div>
              </li>

              <li className="text-white/90">
                <div className="group">
                  <SubMenuSectionMobile
                    title="Accessoires"
                    items={[
                      { href: "/category/accessoires/homme/portefeuilles", title: "Portefeuille", description: "Portefeuilles élégants" },
                      { href: "/category/accessoires/homme/ceintures", title: "Ceinture", description: "Ceintures raffinées" },
                      { href: "/category/accessoires/homme/cravates", title: "Cravate", description: "Cravates élégantes" },
                      { href: "/category/accessoires/homme/mallettes", title: "Mallette", description: "Mallettes professionnelles" },
                      { href: "/category/accessoires/homme/porte-cartes", title: "Porte-carte", description: "Porte-cartes élégants" }
                    ]}
                    onClick={(href) => handleLinkClick(href)}
                  />
                </div>
              </li>

              <li className="text-white/90">
                <div className="group">
                  <SubMenuSectionMobile
                    title="Outlet"
                    items={[
                      { href: "/category/outlet/homme/costumes", title: "Costumes", description: "Costumes en promotion" },
                      { href: "/category/outlet/homme/blazers", title: "Blazers", description: "Blazers en solde" },
                      { href: "/category/outlet/homme/chemises", title: "Chemises", description: "Chemises en promotion" },
                      { href: "/category/outlet/homme/pantalons", title: "Pantalons", description: "Pantalons en solde" },
                      { href: "/category/outlet/homme/pollo", title: "Polo", description: "Polos en promotion" },
                      { href: "/category/outlet/femme/chemises", title: "Chemises Femme", description: "Chemises en promotion" },
                      { href: "/category/outlet/femme/robes", title: "Robes", description: "Robes en solde" },
                      { href: "/category/outlet/femme/vestes", title: "Vestes/Manteaux", description: "Vestes et manteaux en promotion" }
                    ]}
                    onClick={(href) => handleLinkClick(href)}
                  />
                </div>
              </li>

              <li className="mt-6 border-t border-white/10 pt-6 space-y-4">
                <button
                  onClick={() => handleLinkClick("#", onStoreClick)}
                  className="w-full flex items-center gap-3 text-white hover:text-white/80 transition-colors duration-300 py-3 px-4 rounded-lg hover:bg-white/5 group"
                >
                  <MapPin size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">Trouver une boutique</span>
                </button>

                <button
                  onClick={() => handleLinkClick("#", onContactClick)}
                  className="w-full flex items-center gap-3 text-white hover:text-white/80 transition-colors duration-300 py-3 px-4 rounded-lg hover:bg-white/5 group"
                >
                  <Phone size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">Contactez-nous</span>
                </button>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;