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
      { href: "/category/univers-cadeaux/pack-mono", title: "Pack Mono" },
    ],
  },
  {
    title: "Le prêt à porter",
    icon: Shirt,
    link: "#",
    subItems: [
      { href: "/category/pret-a-porter/homme/costumes", title: "Costumes" },
      { href: "/category/pret-a-porter/homme/blazers", title: "Blazers" },
      { href: "/category/pret-a-porter/homme/chemises", title: "Chemises" },
      { href: "/category/pret-a-porter/homme/pulls", title: "Pulls" },
      { href: "/category/pret-a-porter/homme/pantalons", title: "Pantalons" },
    ],
  },
  {
    title: "Accessoires",
    icon: Watch,
    link: "#",
    subItems: [
      { href: "/category/accessoires/homme/portefeuilles", title: "Portefeuilles" },
      { href: "/category/accessoires/homme/ceintures", title: "Ceintures" },
      { href: "/category/accessoires/homme/cravates", title: "Cravates" },
      { href: "/category/accessoires/homme/mallettes", title: "Mallettes" },
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
  },
];