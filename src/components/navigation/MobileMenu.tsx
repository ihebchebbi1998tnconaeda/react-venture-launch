import React from 'react';
import { X, MapPin, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SubMenuSectionMobile from './SubMenuSectionMobile';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
            <h2 className="text-2xl font-semibold text-white tracking-wider">
              {t('mobileMenu.menu')}
            </h2>
            <button
              onClick={onClose}
              aria-label={t('mobileMenu.close')}
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
                    title={t('mobileNav.mondeFiori.title')}
                    items={[
                      { href: "/monde-fiori/histoire", title: t('mobileNav.mondeFiori.histoire'), description: t('subMenuSections.items.histoire.description') },
                      { href: "/monde-fiori/collection", title: t('mobileNav.mondeFiori.collection'), description: t('subMenuSections.items.collection.description') },
                      { href: "/monde-fiori/dna", title: t('mobileNav.mondeFiori.dna'), description: t('subMenuSections.items.dna.description') }
                    ]}
                    onClick={(href) => handleLinkClick(href)}
                  />
                </div>
              </li>

              <li className="text-white/90">
                <div className="group">
                  <SubMenuSectionMobile
                    title={t('mobileNav.universCadeaux.title')}
                    items={[
                      { href: "/univers-cadeaux", title: t('mobileNav.universCadeaux.about'), description: "À propos" },
                      { href: "/univers-cadeaux/packprestige", title: t('mobileNav.universCadeaux.packPrestige'), description: "Notre collection prestige" },
                      { href: "/univers-cadeaux/packpremuim", title: t('mobileNav.universCadeaux.packPremium'), description: "Collection premium" },
                      { href: "/univers-cadeaux/packtrio", title: t('mobileNav.universCadeaux.packTrio'), description: "Ensemble de trois pièces" },
                      { href: "/univers-cadeaux/packduo", title: t('mobileNav.universCadeaux.packDuo'), description: "Ensemble de deux pièces" },
                      { href: "/univers-cadeaux/packminiduo", title: t('mobileNav.universCadeaux.packMiniDuo'), description: "Petit ensemble duo" }
                    ]}
                    onClick={(href) => handleLinkClick(href)}
                  />
                </div>
              </li>

              <li className="text-white/90">
                <div className="group">
                  <SubMenuSectionMobile
                    title={t('mobileNav.pretAPorter.title')}
                    items={[
                      { href: "/category/pret-a-porter/homme/costumes", title: t('mobileNav.pretAPorter.costume'), description: t('subMenuSections.items.costumes.description') },
                      { href: "/category/pret-a-porter/homme/blazers", title: t('mobileNav.pretAPorter.blazer'), description: t('subMenuSections.items.blazers.description') },
                      { href: "/category/pret-a-porter/homme/vestes", title: t('mobileNav.pretAPorter.vestes'), description: t('subMenuSections.items.vestes.description') },
                      { href: "/category/pret-a-porter/homme/chemises", title: t('mobileNav.pretAPorter.chemise'), description: t('subMenuSections.items.chemises.description') },
                      { href: "/category/pret-a-porter/homme/pantalons", title: t('mobileNav.pretAPorter.pantalon'), description: t('subMenuSections.items.pantalons.description') },
                      { href: "/category/pret-a-porter/homme/pollo", title: t('mobileNav.pretAPorter.polo'), description: t('subMenuSections.items.polo.description') }
                    ]}
                    onClick={(href) => handleLinkClick(href)}
                  />
                </div>
              </li>

              <li className="text-white/90">
                <div className="group">
                  <SubMenuSectionMobile
                    title={t('mobileNav.accessoires.title')}
                    items={[
                      { href: "/category/accessoires/homme/portefeuilles", title: t('mobileNav.accessoires.portefeuille'), description: t('subMenuSections.items.portefeuilles.description') },
                      { href: "/category/accessoires/homme/ceintures", title: t('mobileNav.accessoires.ceinture'), description: t('subMenuSections.items.ceintures.description') },
                      { href: "/category/accessoires/homme/cravates", title: t('mobileNav.accessoires.cravate'), description: t('subMenuSections.items.cravates.description') },
                      { href: "/category/accessoires/homme/mallettes", title: t('mobileNav.accessoires.mallette'), description: t('subMenuSections.items.mallettes.description') },
                      { href: "/category/accessoires/homme/porte-cartes", title: t('mobileNav.accessoires.porteCarte'), description: t('subMenuSections.items.porteCartes.description') }
                    ]}
                    onClick={(href) => handleLinkClick(href)}
                  />
                </div>
              </li>

              <li className="text-white/90">
                <div className="group">
                  <SubMenuSectionMobile
                    title={t('mobileNav.outlet.title')}
                    items={[
                      { href: "/category/outlet/homme/costumes", title: t('mobileNav.outlet.costumes'), description: t('subMenuSections.items.costumes.description') },
                      { href: "/category/outlet/homme/blazers", title: t('mobileNav.outlet.blazers'), description: t('subMenuSections.items.blazers.description') },
                      { href: "/category/outlet/homme/chemises", title: t('mobileNav.outlet.chemises'), description: t('subMenuSections.items.chemises.description') },
                      { href: "/category/outlet/homme/pantalons", title: t('mobileNav.outlet.pantalons'), description: t('subMenuSections.items.pantalons.description') },
                      { href: "/category/outlet/homme/pollo", title: t('mobileNav.outlet.polo'), description: t('subMenuSections.items.polo.description') },
                      { href: "/category/outlet/femme/chemises", title: t('mobileNav.outlet.chemisesFemme'), description: t('subMenuSections.items.chemises.description') },
                      { href: "/category/outlet/femme/robes", title: t('mobileNav.outlet.robes'), description: t('subMenuSections.items.robes.description') },
                      { href: "/category/outlet/femme/vestes", title: t('mobileNav.outlet.vestesManteaux'), description: t('subMenuSections.items.vestesManteaux.description') }
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
                  <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">
                    {t('mobileMenu.findStore')}
                  </span>
                </button>

                <button
                  onClick={() => handleLinkClick("#", onContactClick)}
                  className="w-full flex items-center gap-3 text-white hover:text-white/80 transition-colors duration-300 py-3 px-4 rounded-lg hover:bg-white/5 group"
                >
                  <Phone size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">
                    {t('mobileMenu.contactUs')}
                  </span>
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