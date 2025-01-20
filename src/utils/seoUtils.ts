interface MetaTags {
  title: string;
  description: string;
  keywords: string[];
}

export const getMetaTags = (path: string): MetaTags => {
  const basePath = path.split('/')[1];
  
  const metaTagsMap: Record<string, MetaTags> = {
    'pret-a-porter': {
      title: 'Prêt-à-Porter de Luxe | Fiori',
      description: 'Découvrez notre collection de prêt-à-porter haut de gamme. Costumes, chemises, robes et plus encore.',
      keywords: ['prêt-à-porter', 'costumes', 'chemises', 'robes', 'vestes', 'pantalons', 'mode luxe', 'vêtements tunisie']
    },
    'univers-cadeaux': {
      title: 'Univers Cadeaux | Fiori',
      description: 'Offrez l\'élégance avec nos coffrets cadeaux personnalisés. Packs premium et prestige disponibles.',
      keywords: ['coffrets cadeaux', 'pack prestige', 'pack premium', 'cadeaux luxe', 'cadeaux personnalisés']
    },
    'accessoires': {
      title: 'Accessoires de Luxe | Fiori',
      description: 'Complétez votre style avec nos accessoires haut de gamme. Ceintures, portefeuilles, cravates et plus.',
      keywords: ['accessoires luxe', 'ceintures cuir', 'portefeuilles', 'cravates soie', 'accessoires mode']
    },
    'sur-mesure': {
      title: 'Sur Mesure | Fiori',
      description: 'Créez vos vêtements sur mesure avec Fiori. Un service personnalisé pour une élégance unique.',
      keywords: ['sur mesure', 'costumes personnalisés', 'chemises sur mesure', 'tailleur tunisie']
    },
    'monde-fiori': {
      title: 'Le Monde Fiori | Notre Histoire',
      description: 'Découvrez l\'histoire et les valeurs de Fiori. Une marque tunisienne de luxe engagée dans l\'excellence.',
      keywords: ['histoire fiori', 'marque luxe tunisie', 'savoir-faire', 'artisanat tunisien']
    },
    'outlet': {
      title: 'Outlet Fiori | Offres Exceptionnelles',
      description: 'Profitez de nos offres exceptionnelles sur une sélection de produits haut de gamme.',
      keywords: ['outlet', 'promotions', 'soldes luxe', 'bonnes affaires', 'vêtements luxe promotion']
    }
  };

  return metaTagsMap[basePath] || {
    title: 'Fiori - Vêtements Personnalisés & Haut de Gamme en Tunisie',
    description: 'Découvrez l\'élégance personnalisée avec Fiori. Vêtements haut de gamme et accessoires de luxe en Tunisie.',
    keywords: ['fiori', 'mode luxe', 'vêtements tunisie', 'prêt-à-porter', 'accessoires']
  };
};

export const updateMetaTags = (path: string): void => {
  const { title, description, keywords } = getMetaTags(path);
  
  document.title = title;
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }
  
  // Update meta keywords
  const metaKeywords = document.querySelector('meta[name="keywords"]');
  if (metaKeywords) {
    metaKeywords.setAttribute('content', keywords.join(', '));
  }
  
  // Update OpenGraph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  
  if (ogTitle) ogTitle.setAttribute('content', title);
  if (ogDescription) ogDescription.setAttribute('content', description);
};