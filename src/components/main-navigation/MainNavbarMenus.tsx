import React from 'react';
import NavMenuItem from '../navigation/NavMenuItem';
import GiftUniverseMenu from './GiftUniverseMenu';
import { NavigationMenuList } from "@/components/ui/navigation-menu";
import MondeFioriSection from './menu-sections/MondeFioriSection';
import PretAPorterSection from './menu-sections/PretAPorterSection';
import AccessoiresSection from './menu-sections/AccessoiresSection';
import SubMenuSection from '../navigation/SubMenuSection';
import { Link } from 'react-router-dom';

const MainNavbarMenus = () => {
  return (
    <NavigationMenuList className="flex flex-col lg:flex-row lg:gap-4 gap-4  items-center">
      <NavMenuItem title="Le monde Fiori" image="/Menu/Universcadeau.png">
        <MondeFioriSection />
      </NavMenuItem>

      <NavMenuItem 
        title="L'univers Cadeaux" 
        image="/Menu/Universcadeau.png"
        href="/univers-cadeaux"
      >
        <GiftUniverseMenu />
      </NavMenuItem>

      <NavMenuItem title="Le prêt à porter" image="/Menu/lepresaporte.png">
        <PretAPorterSection />
      </NavMenuItem>

      <NavMenuItem title="Accessoires" image="/Menu/accessoires.png">
        <AccessoiresSection />
      </NavMenuItem>

      <Link to="/sur-mesure" className="text-white text-[16px] lg:text-[21px] hover:text-white/80 transition-colors">
        Le sur mesure
      </Link>

      <NavMenuItem title="Outlet" image="/Menu/Ooutlet.png">
        <div className="grid grid-cols-2 gap-3">
          <SubMenuSection
            title="Homme"
            items={[
              {
                href: "/category/outlet/homme/costumes",
                title: "Costume",
                description: "Costumes en promotion"
              },
              {
                href: "/category/outlet/homme/blazers",
                title: "Blazer",
                description: "Blazers en solde"
              }
            ]}
          />
          <SubMenuSection
            title="Femme"
            items={[
              {
                href: "/category/outlet/femme/chemises",
                title: "Chemises",
                description: "Chemises en promotion"
              }
            ]}
          />
        </div>
      </NavMenuItem>
    </NavigationMenuList>
  );
};

export default MainNavbarMenus;