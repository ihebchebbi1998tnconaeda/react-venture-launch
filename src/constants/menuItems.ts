import { Gift, ShoppingBag, Shirt, Watch, Scissors } from 'lucide-react';

export const menuItems = [
  {
    title: "Le monde Fiori",
    icon: Gift,
    link: "#",
    subItems: [
      { href: "/category/le-monde-fiori/printemps", title: "Collections Printemps" },
      { href: "/category/le-monde-fiori/ete", title: "Collections Été" },
      { href: "/category/le-monde-fiori/mariage", title: "Marriage" },
      { href: "/category/le-monde-fiori/soiree", title: "Soirée" },
    ],
  },
  {
    title: "L'univers Cadeaux",
    icon: ShoppingBag,
    link: "#",
    subItems: [
      { href: "/category/univers-cadeaux/pack-prestige", title: "Pack Prestige" },
      { href: "/category/univers-cadeaux/pack-premium", title: "Pack Premium" },
      { href: "/category/univers-cadeaux/pack-trio", title: "Pack Trio" },
      { href: "/category/univers-cadeaux/pack-duo", title: "Pack Duo" },
      { href: "/category/univers-cadeaux/pack-mini-duo", title: "Pack Mini Duo" },
      { href: "/category/univers-cadeaux/packchemise", title: "Pack Chemise" },
    ],
  },
  {
    title: "Le prêt à porter",
    icon: Shirt,
    link: "#",
    subItems: [
      { href: "/category/pret-a-porter/homme/costumes", title: "Costumes" },
      { href: "/category/pret-a-porter/homme/blazers", title: "Blazers" },
      { href: "/category/pret-a-porter/homme/vestes", title: "Vestes" },
      { href: "/category/pret-a-porter/homme/chemises", title: "Chemises" },
      { href: "/category/pret-a-porter/homme/pantalons", title: "Pantalons" },
      { href: "/category/pret-a-porter/homme/pollo", title: "Polo" },
    ],
  },
  {
    title: "Accessoires",
    icon: Watch,
    link: "#",
    subItems: [
      { href: "/category/accessoires/homme/portefeuilles", title: "Portefeuille" },
      { href: "/category/accessoires/homme/ceintures", title: "Ceinture" },
      { href: "/category/accessoires/homme/cravates", title: "Cravate" },
      { href: "/category/accessoires/homme/mallettes", title: "Mallette" },
      { href: "/category/accessoires/homme/porte-cartes", title: "Porte-cartes" },
      { href: "/category/accessoires/homme/porte-cles", title: "Porte-clés" },
      { href: "/category/accessoires/femmes/sacs-a-main", title: "Sacs à main" },
    ],
  },
  {
    title: "Sur mesure",
    icon: Scissors,
    link: "/category/sur-mesure",
  },
  {
    title: "Outlet",
    icon: ShoppingBag,
    link: "/category/outlet",
    subItems: [
      { href: "/category/outlet/homme/costumes", title: "Costumes" },
      { href: "/category/outlet/homme/blazers", title: "Blazers" },
      { href: "/category/outlet/homme/chemises", title: "Chemises" },
      { href: "/category/outlet/homme/pantalons", title: "Pantalons" },
      { href: "/category/outlet/homme/pollo", title: "Polo" },
      { href: "/category/outlet/femme/chemises", title: "Chemises Femme" },
      { href: "/category/outlet/femme/robes", title: "Robes" },
      { href: "/category/outlet/femme/vestes", title: "Vestes/Manteaux" },
    ],
  },
];