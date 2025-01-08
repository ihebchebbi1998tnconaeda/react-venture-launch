import React, { useState } from "react";
import { Menu, X, MapPin, Phone } from "lucide-react";
import CartIcon from "./navigation/CartIcon";
import MobileMenu from "./navigation/MobileMenu";
import MobileMenuOverlay from "./navigation/MobileMenuOverlay";
import { menuItems } from "@/constants/menuItems";
import StoreLocationsModal from "./StoreLocationsModal";
import ContactModal from "./ContactModal";
import LanguageSwitcher from "./LanguageSwitcher";

const TopNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setExpandedItem(null);
  };

  const toggleSubmenu = (title: string) => {
    setExpandedItem(expandedItem === title ? null : title);
  };

  return (
    <div className="font-['WomanFontRegular']">
      <nav className="bg-primary px-2 sm:px-3 py-3 sm:py-[4px] shadow-md">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <div className="flex items-center justify-between w-full sm:w-auto sm:h-[90%]">
            <button
              onClick={toggleMenu}
              className="lg:hidden text-white hover:text-accent transition-colors duration-300 -ml-1"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={26} className="text-white" />
              ) : (
                <Menu size={26} className="text-white" />
              )}
            </button>

            <div className="hidden sm:flex items-center gap-4">
              <span className="flex items-center gap-2 text-sm text-white whitespace-nowrap">
                Livraison gratuite à partir de 299 TND
              </span>
            </div>

            <div className="flex items-center gap-4 sm:hidden -mr-1">
              <CartIcon />
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4 sm:h-[90%]">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="flex items-center gap-2 text-sm text-white whitespace-nowrap hover:text-accent transition-colors duration-300"
            >
              <Phone size={16} />
              CONTACTEZ-NOUS
            </button>
            <CartIcon />
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isOpen}
        onClose={toggleMenu}
        menuItems={menuItems}
        expandedItem={expandedItem}
        onToggleSubmenu={toggleSubmenu}
        onStoreClick={() => setIsStoreModalOpen(true)}
        onContactClick={() => setIsContactModalOpen(true)}
      />

      <MobileMenuOverlay isOpen={isOpen} onClose={toggleMenu} />

      <StoreLocationsModal
        isOpen={isStoreModalOpen}
        onOpenChange={setIsStoreModalOpen}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
      />
    </div>
  );
};

export default TopNavbar;