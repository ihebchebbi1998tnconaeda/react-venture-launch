import React from 'react';
import NavMenuItem from '../navigation/NavMenuItem';
import GiftUniverseMenu from './GiftUniverseMenu';
import { NavigationMenuList } from "@/components/ui/navigation-menu";
import MondeFioriSection from './menu-sections/MondeFioriSection';
import PretAPorterSection from './menu-sections/PretAPorterSection';
import AccessoiresSection from './menu-sections/AccessoiresSection';
import SubMenuSection from '../navigation/SubMenuSection';

const MainNavbarMenusProducts = () => {
  return (
    <NavigationMenuList className="flex flex-col lg:flex-row lg:gap-4 gap-4 text-[#700100]  items-center">
      <NavMenuItem title="Le monde Fiori" image="/Menu/mondefiori.png">
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

      <NavMenuItem title="Outlet" image="/Menu/Ooutlet.png">
        <div className="grid grid-cols-2 gap-3">
          <SubMenuSection
            title="Homme"
            items={[
              {
                href: "/category/outlet/homme/costumes",
                title: "Costumes",
                description: "Costumes en promotion"
              },
              {
                href: "/category/outlet/homme/blazers",
                title: "Blazers",
                description: "Blazers en solde"
              },
              {
                href: "/category/outlet/homme/chemises",
                title: "Chemises",
                description: "Chemises en promotion"
              },
              {
                href: "/category/outlet/homme/pantalons",
                title: "Pantalons",
                description: "Pantalons en solde"
              },
              {
                href: "/category/outlet/homme/pollo",
                title: "Polo",
                description: "Polos en promotion"
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
              },
              {
                href: "/category/outlet/femme/robes",
                title: "Robes",
                description: "Robes en solde"
              },
              {
                href: "/category/outlet/femme/vestes",
                title: "Vestes/Manteaux",
                description: "Vestes et manteaux en promotion"
              }
            ]}
          />
        </div>
      </NavMenuItem>
    </NavigationMenuList>
  );
};

export default MainNavbarMenusProducts;