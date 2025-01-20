import React from 'react';
import SubMenuSection from '../../navigation/SubMenuSection';

const ProductPretAPorterSection = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <SubMenuSection
        title="Homme"
        items={[
          {
            href: "/category/pret-a-porter/homme/costumes",
            title: "Costumes",
            description: "Costumes élégants"
          },
          {
            href: "/category/pret-a-porter/homme/blazers",
            title: "Blazers",
            description: "Blazers raffinés"
          },
          {
            href: "/category/outlet/homme/blazers",
            title: "Vestes",
            description: "Vestes élégantes"
          },
          {
            href: "/category/pret-a-porter/homme/chemises",
            title: "Chemises",
            description: "Chemises classiques"
          },
          {
            href: "/category/pret-a-porter/homme/pantalons",
            title: "Pantalons",
            description: "Pantalons élégants"
          },
          {
            href: "/category/pret-a-porter/homme/pollo",
            title: "Pollo",
            description: "Polos élégants"
          }
        ]}
      />
      <SubMenuSection
        title="Femme"
        items={[
          {
            href: "/category/pret-a-porter/femme/chemises",
            title: "Chemises",
            description: "Chemises féminines"
          },
          {
            href: "/category/pret-a-porter/femme/robes",
            title: "Robes",
            description: "Robes élégantes"
          },
          {
            href: "/category/pret-a-porter/femme/vestes",
            title: "Vestes/Manteaux",
            description: "Vestes et manteaux"
          }
        ]}
      />
    </div>
  );
};

export default ProductPretAPorterSection;