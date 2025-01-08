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
      <NavMenuItem title="Le monde Fiori" image="/Articles/1.png">
        <MondeFioriSection />
      </NavMenuItem>

      <NavMenuItem title="L'univers Cadeaux" image="/Articles/2.png">
        <GiftUniverseMenu />
      </NavMenuItem>

      <NavMenuItem title="Le prêt à porter" image="/Articles/3.png">
        <PretAPorterSection />
      </NavMenuItem>

      <NavMenuItem title="Accessoires" image="/Articles/4.png">
        <AccessoiresSection />
      </NavMenuItem>

      <NavMenuItem title="Le sur mesure" image="/Articles/4.png">
        <div className="grid grid-cols-2 gap-3">
          <SubMenuSection
            title="Homme"
            items={[
              {
                href: "/category/sur-mesure/homme/portefeuilles",
                title: "Portefeuilles",
                description: "Portefeuilles élégants"
              },
              {
                href: "/category/sur-mesure/homme/ceintures",
                title: "Ceintures",
                description: "Ceintures raffinées"
              }
            ]}
          />
          <SubMenuSection
            title="Femme"
            items={[
              {
                href: "/category/sur-mesure/femme/sacs-a-main",
                title: "Sacs à main",
                description: "Sacs à main élégants"
              }
            ]}
          />
        </div>
      </NavMenuItem>

      <NavMenuItem title="Outlet" image="/NewCollection/Together We Feast.png">
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

export default MainNavbarMenusProducts;