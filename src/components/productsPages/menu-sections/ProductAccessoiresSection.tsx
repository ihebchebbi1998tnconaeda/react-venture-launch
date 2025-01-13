import React from 'react';
import SubMenuSection from '../../navigation/SubMenuSection';

const ProductAccessoiresSection = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <SubMenuSection
        title="Homme"
        items={[
          {
            href: "/category/accessoires/homme/portefeuilles",
            title: "Portefeuille",
            description: "Portefeuilles élégants"
          },
          {
            href: "/category/accessoires/homme/ceintures",
            title: "Ceinture",
            description: "Ceintures raffinées"
          },
          {
            href: "/category/accessoires/homme/cravates",
            title: "Cravate",
            description: "Cravates élégantes"
          },
          {
            href: "/category/accessoires/homme/mallettes",
            title: "Mallette",
            description: "Mallettes professionnelles"
          },
          {
            href: "/category/accessoires/homme/porte-cartes",
            title: "Porte-carte",
            description: "Porte-cartes élégants"
          }
        ]}
      />
      <SubMenuSection
        title="Femme"
        items={[
          {
            href: "/category/accessoires/femme/sacs-a-main",
            title: "Sacs à main",
            description: "Sacs à main élégants"
          }
        ]}
      />
    </div>
  );
};

export default ProductAccessoiresSection;