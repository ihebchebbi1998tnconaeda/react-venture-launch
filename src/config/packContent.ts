interface PackContent {
  title: string;
  description: string;
  images: string[];
  videoUrl: string;
}

export const packContent: Record<string, PackContent> = {
  'Pack Prestige': {
    title: "Le Coffret Prestige",
    description: "Le Coffret Prestige est bien plus qu'un simple cadeau : c'est une expérience d'élégance et de raffinement. Ce coffret comprend une chemise personnalisable où vous pouvez ajouter votre nom ou un message unique, un portefeuille et une ceinture en cuir.",
    images: [
      "/Prestige/1.png",
      "/Prestige/2.jpg",
      "/Prestige/3.jpg"
    ],
    videoUrl: "/Prestige/video.mp4"
  },
  'Pack Premium': {
    title: "Le Pack Premium",
    description: "Le Pack Premium est une invitation à allier style et praticité. Ce coffret contient une cravate élégante, un portefeuille en cuir de qualité, et une ceinture assortie. Ajoutez une touche personnelle avec un nom ou un message pour rendre ce cadeau inoubliable.",
    images: [
      "/Premium/1.png",
      "/Premium/2.png",
      "/Premium/3.png"
    ],
    videoUrl: "/Premium/video.mp4"
  },
  'Pack Trio': {
    title: "Le Pack Trio",
    description: "Le Pack Trio est la combinaison idéale d'élégance et de fonctionnalité. Ce coffret contient un portefeuille en cuir haut de gamme, une ceinture sophistiquée, et un porte-clés raffiné. Personnalisez vos articles pour en faire un cadeau exceptionnel.",
    images: [
      "/Trio/1.png",
      "/Trio/2.png",
      "/Trio/3.png"
    ],
    videoUrl: "/Trio/video.mp4"
  },
  'Pack Duo': {
    title: "Le Pack Duo",
    description: "Le Pack Duo est une alliance parfaite de simplicité et d'élégance. Ce coffret contient un portefeuille en cuir de qualité supérieure et une ceinture élégante. Offrez un cadeau unique en le personnalisant avec un nom ou un message.",
    images: [
      "/packduo.png"
    ],
    videoUrl: ""
  },
  'Pack Mini Duo': {
    title: "Le Pack Mini Duo",
    description: "Compact et élégant, le Pack Mini Duo est un cadeau idéal. Il inclut un portefeuille en cuir raffiné et une ceinture sophistiquée. Ajoutez une gravure personnalisée pour une touche unique.",
    images: [
      "/Packduomini2.png"
    ],
    videoUrl: ""
  },
  'Pack Chemise': {
    title: "Le Pack Chemise",
    description: "Le Pack Chemise offre une sélection exclusive de chemises d'une qualité exceptionnelle. Chaque chemise est choisie pour son style intemporel et sa finesse. Ajoutez votre touche personnelle pour un cadeau unique.",
    images: [
      "https://placehold.co/600x400/67000D/ffffff?text=Shirt+1",
      "https://placehold.co/600x400/333333/ffffff?text=Shirt+2",
      "https://placehold.co/600x400/67000D/ffffff?text=Shirt+3"
    ],
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  'Pack Ceinture': {
    title: "Le Pack Ceinture",
    description: "Explorez notre Pack Ceinture, une collection de ceintures élégantes fabriquées avec soin pour allier style et durabilité. Personnalisez-les avec une gravure unique pour une présentation sophistiquée.",
    images: [
      "https://placehold.co/600x400/67000D/ffffff?text=Belt+1",
      "https://placehold.co/600x400/333333/ffffff?text=Belt+2",
      "https://placehold.co/600x400/67000D/ffffff?text=Belt+3"
    ],
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  'Pack Cravatte': {
    title: "Le Pack Cravatte",
    description: "Le Pack Cravatte présente une collection exquise de cravates intemporelles. Chaque pièce est choisie pour sa qualité et son style exceptionnel. Personnalisez votre choix pour un cadeau inoubliable.",
    images: [
      "https://placehold.co/600x400/67000D/ffffff?text=Tie+1",
      "https://placehold.co/600x400/333333/ffffff?text=Tie+2",
      "https://placehold.co/600x400/67000D/ffffff?text=Tie+3"
    ],
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  'Pack Malette': {
    title: "Le Pack Malette",
    description: "Le Pack Malette propose une sélection premium de mallettes au design élégant et professionnel. Idéal pour allier style et praticité, chaque mallette peut être personnalisée pour un cadeau mémorable.",
    images: [
      "https://placehold.co/600x400/67000D/ffffff?text=Briefcase+1",
      "https://placehold.co/600x400/333333/ffffff?text=Briefcase+2",
      "https://placehold.co/600x400/67000D/ffffff?text=Briefcase+3"
    ],
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  'Pack Portefeuille': {
    title: "Le Pack Portefeuille",
    description: "Le Pack Portefeuille est une sélection d'articles soigneusement confectionnés pour répondre à toutes vos attentes en matière de style et de praticité. Personnalisez-les pour un cadeau distinctif.",
    images: [
      "https://placehold.co/600x400/67000D/ffffff?text=Wallet+1",
      "https://placehold.co/600x400/333333/ffffff?text=Wallet+2",
      "https://placehold.co/600x400/67000D/ffffff?text=Wallet+3"
    ],
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  'Pack Porte-carte': {
    title: "Le Pack Porte-carte",
    description: "Découvrez le Pack Porte-carte, une collection élégante et pratique. Chaque porte-carte est conçu avec soin et peut être personnalisé pour un cadeau unique.",
    images: [
      "https://placehold.co/600x400/67000D/ffffff?text=Card+Holder+1",
      "https://placehold.co/600x400/333333/ffffff?text=Card+Holder+2",
      "https://placehold.co/600x400/67000D/ffffff?text=Card+Holder+3"
    ],
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  'Pack Porte-clé': {
    title: "Le Pack Porte-clé",
    description: "Le Pack Porte-clé offre une gamme raffinée d'accessoires pratiques et élégants. Ajoutez une gravure personnelle pour une présentation unique.",
    images: [
      "https://placehold.co/600x400/67000D/ffffff?text=Key+Holder+1",
      "https://placehold.co/600x400/333333/ffffff?text=Key+Holder+2",
      "https://placehold.co/600x400/67000D/ffffff?text=Key+Holder+3"
    ],
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  }
};

export const getPackContent = (packType: string): PackContent => {
  const content = packContent[packType];
  if (!content) {
    throw new Error(`Pack type "${packType}" not found`);
  }
  return content;
};