import React from 'react';
import SubMenuSection from '../../navigation/SubMenuSection';

const PretAPorterSection = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <SubMenuSection
        title="Homme"
        items={[
          {
            href: "/category/pret-a-porter/homme/costumes",
            title: "Costume",
            description: "Costumes élégants"
          },
          {
            href: "/category/pret-a-porter/homme/blazers",
            title: "Blazer",
            description: "Blazers raffinés"
          },
          {
            href: "/category/pret-a-porter/homme/chemises",
            title: "Chemise",
            description: "Chemises classiques"
          },
          {
            href: "/category/pret-a-porter/homme/pantalons",
            title: "Pantalon",
            description: "Pantalons élégants"
          },
          {
            href: "/category/pret-a-porter/homme/pollo",
            title: "Polo",
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

export default PretAPorterSection;