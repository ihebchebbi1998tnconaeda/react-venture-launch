export type PersonalizationConfig = {
  [key: string]: {
    canPersonalize: boolean;
    message?: string;
  };
};

export const personalizationConfig: PersonalizationConfig = {
  // Prêt à Porter - Homme
  'costumes': { canPersonalize: true },
  'blazers': { canPersonalize: true },
  'chemises': { canPersonalize: true },
  'pantalons': { canPersonalize: true },
  'pollo': { canPersonalize: true },
  
  // Prêt à Porter - Femme
  'robes': { canPersonalize: true },
  'vestes': { canPersonalize: true },
  
  // Accessoires - Homme
  'portefeuilles': { canPersonalize: true },
  'ceintures': { canPersonalize: true },
  'cravates': {
    canPersonalize: false,
    message: 'Les cravates ne peuvent pas être personnalisées'
  },
  'mallettes': { canPersonalize: true },
  'porte-cartes': { canPersonalize: true },
  'porte-cles': { canPersonalize: true },
  
  // Accessoires - Femme
  'sacs-a-main': { canPersonalize: true },
  
  // Default case for any unspecified item group
  'default': { canPersonalize: true }
};

export const canItemBePersonalized = (itemGroup: string): boolean => {
  console.log('Checking personalization for itemGroup:', itemGroup);
  const config = personalizationConfig[itemGroup] || personalizationConfig.default;
  console.log('Personalization config for', itemGroup, ':', config);
  return config.canPersonalize;
};

export const getPersonalizationMessage = (itemGroup: string): string | undefined => {
  console.log('Getting message for itemGroup:', itemGroup);
  const config = personalizationConfig[itemGroup] || personalizationConfig.default;
  console.log('Message config for', itemGroup, ':', config.message);
  return config.message;
};