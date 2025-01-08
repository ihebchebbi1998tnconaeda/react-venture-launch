import React from 'react';
import { X, MapPin, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SubMenuSectionMobile from './SubMenuSectionMobile';

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
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-0 left-0 h-full bg-gradient-to-br from-[#700100]/95 via-[#8B0000]/90 to-[#700100]/95 backdrop-blur-lg shadow-2xl w-[85vw] max-w-[400px] z-50 overflow-hidden"
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
              <li className="text-white/90">
                <div className="group">
                  <SubMenuSectionMobile
                    title="Le monde Fiori"
                    items={[
                      { href: "/monde-fiori/histoire", title: "Histoire", description: "Notre histoire" },
                      { href: "/monde-fiori/collection", title: "Collection", description: "Nos collections" },
                      { href: "/monde-fiori/dna", title: "DNA", description: "Notre ADN" }
                    ]}
                  />
                </div>
              </li>

              <li className="text-white/90">
                <div className="group">
                  <SubMenuSectionMobile
                    title="L'univers Cadeaux"
                    items={[
                      { href: "/univers-cadeaux/packprestige", title: "Pack Prestige", description: "Notre collection prestige" },
                      { href: "/univers-cadeaux/packpremuim", title: "Pack Premium", description: "Collection premium" },
                      { href: "/univers-cadeaux/packtrio", title: "Pack Trio", description: "Ensemble de trois pièces" },
                      { href: "/univers-cadeaux/packduo", title: "Pack Duo", description: "Ensemble de deux pièces" },
                      { href: "/univers-cadeaux/packminiduo", title: "Pack Mini Duo", description: "Petit ensemble duo" }
                    ]}
                  />
                </div>
              </li>

              <li className="text-white/90">
                <div className="group">
                  <SubMenuSectionMobile
                    title="Le prêt à porter"
                    items={[
                      { href: "/category/pret-a-porter/homme/costumes", title: "Costumes", description: "Costumes élégants" },
                      { href: "/category/pret-a-porter/homme/blazers", title: "Blazers", description: "Blazers raffinés" },
                      { href: "/category/pret-a-porter/homme/chemises", title: "Chemises", description: "Chemises classiques" },
                      { href: "/category/pret-a-porter/homme/pantalons", title: "Pantalons", description: "Pantalons élégants" },
                      { href: "/category/pret-a-porter/homme/pollo", title: "Pollo", description: "Polos élégants" }
                    ]}
                  />
                </div>
              </li>

              <li className="text-white/90">
                <div className="group">
                  <SubMenuSectionMobile
                    title="Accessoires"
                    items={[
                      { href: "/category/accessoires/homme/portefeuilles", title: "Portefeuilles", description: "Portefeuilles élégants" },
                      { href: "/category/accessoires/homme/ceintures", title: "Ceintures", description: "Ceintures raffinées" },
                      { href: "/category/accessoires/homme/cravates", title: "Cravates", description: "Cravates élégantes" },
                      { href: "/category/accessoires/homme/mallettes", title: "Mallettes", description: "Mallettes professionnelles" },
                      { href: "/category/accessoires/homme/porte-cartes", title: "Porte-cartes", description: "Porte-cartes élégants" }
                    ]}
                  />
                </div>
              </li>

              <li className="text-white/90">
                <div className="group">
                  <SubMenuSectionMobile
                    title="Le sur mesure"
                    items={[
                      { href: "/category/sur-mesure/homme/portefeuilles", title: "Portefeuilles", description: "Portefeuilles sur mesure" },
                      { href: "/category/sur-mesure/homme/ceintures", title: "Ceintures", description: "Ceintures sur mesure" }
                    ]}
                  />
                </div>
              </li>

              <li className="text-white/90">
                <div className="group">
                  <SubMenuSectionMobile
                    title="Outlet"
                    items={[
                      { href: "/category/outlet/homme/costumes", title: "Costumes", description: "Costumes en promotion" },
                      { href: "/category/outlet/homme/blazers", title: "Blazers", description: "Blazers en solde" }
                    ]}
                  />
                </div>
              </li>
              
              <li className="mt-6 border-t border-white/10 pt-6 space-y-4">
                <button
                  onClick={onStoreClick}
                  className="w-full flex items-center gap-3 text-white hover:text-white/80 transition-colors duration-300 py-3 px-4 rounded-lg hover:bg-white/5 group"
                >
                  <MapPin size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">Trouver une boutique</span>
                </button>

                <button
                  onClick={onContactClick}
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