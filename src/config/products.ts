export interface ProductConfig {
  id: string;
  name: string;
  description: string;
  startingPrice: string;
  image?: string;
}

export const products: ProductConfig[] = [
  {
    id: "mugs",
    name: "Tasses",
    description: "Tasses personnalisées pour votre café quotidien. Design unique et qualité premium garantie.",
    startingPrice: "25.00",
    image: "https://placehold.co/800x800"
  },
  {
    id: "tshirts",
    name: "T-shirts",
    description: "T-shirts confortables avec votre design unique. Tissu de haute qualité pour un confort optimal.",
    startingPrice: "35.00",
    image: "https://placehold.co/800x800"
  },
  {
    id: "blouses",
    name: "Blouses de travail",
    description: "Blouses professionnelles personnalisées. Adaptées à tous les environnements de travail.",
    startingPrice: "45.00",
    image: "https://placehold.co/800x800"
  },
  {
    id: "flyers",
    name: "Flyers",
    description: "Flyers promotionnels sur mesure. Impression haute qualité pour un impact maximal.",
    startingPrice: "15.00",
    image: "https://placehold.co/800x800"
  },
  {
    id: "notebooks",
    name: "Carnets",
    description: "Carnets personnalisés pour vos notes. Papier de qualité et finition professionnelle.",
    startingPrice: "20.00",
    image: "https://placehold.co/800x800"
  },
  {
    id: "bags",
    name: "Sacs",
    description: "Sacs personnalisés pour tous les jours. Matériaux durables et design élégant.",
    startingPrice: "30.00",
    image: "https://placehold.co/800x800"
  }
];