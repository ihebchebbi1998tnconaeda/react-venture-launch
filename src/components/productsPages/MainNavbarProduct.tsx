import React from 'react';
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import NavMenuItemProduct from '../navigation/NavMenuItemProduct';
import GiftUniverseMenu from '../main-navigation/GiftUniverseMenu';
import ProductMondeFioriSection from './menu-sections/ProductMondeFioriSection';
import ProductPretAPorterSection from './menu-sections/ProductPretAPorterSection';
import ProductAccessoiresSection from './menu-sections/ProductAccessoiresSection';
import SubMenuSection from '../navigation/SubMenuSection';

const MainNavbarProduct = () => {
  return (
    <div className="w-full z-15 bg-[#EFEDED] text-center lg:top-[-51%] top-[-150px] px-4 font-['WomanFont']">
      <NavigationMenu className="mx-auto max-w-screen-2xl">
        <NavigationMenuList className="flex flex-col lg:flex-row lg:gap-14 gap-6 items-center">
          
          <NavMenuItemProduct title="Le monde Fiori" image="/Articles/1.png">
            <ProductMondeFioriSection />
          </NavMenuItemProduct>

          <NavMenuItemProduct title="L'univers Cadeaux" image="/Articles/2.png">
            <GiftUniverseMenu />
          </NavMenuItemProduct>

          <NavMenuItemProduct title="Le prêt à porter" image="/Articles/3.png">
            <ProductPretAPorterSection />
          </NavMenuItemProduct>

          <NavMenuItemProduct title="Accessoires" image="/Articles/4.png">
            <ProductAccessoiresSection />
          </NavMenuItemProduct>

          <NavMenuItemProduct title="Le sur mesure" image="/Articles/4.png">
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
          </NavMenuItemProduct>

          <NavMenuItemProduct title="Outlet" image="/NewCollection/Together We Feast.png">
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
          </NavMenuItemProduct>

        </NavigationMenuList>
      </NavigationMenu>
      <br />
    </div>
  );
};

export default MainNavbarProduct;