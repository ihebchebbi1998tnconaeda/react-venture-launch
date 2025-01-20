import { Product } from '@/types/product';

type CategoryType = {
  label: string;
  type: string;
  value: string;
  additionalFilter?: {
    field: string;
    value: string;
  };
};

export const getAvailableCategories = (
  packType: string,
  selectedContainerIndex: number,
  selectedItems: Product[]
): CategoryType[] => {
  if (packType === 'Pack Premium') {
    // First slot must be cravate
    if (selectedItems.length === 0) {
      return [{ label: 'Cravates', type: 'itemgroup', value: 'cravates' }];
    }
    
    // Second slot must be portefeuille
    if (selectedItems.length === 1) {
      return [{ label: 'Portefeuilles', type: 'itemgroup', value: 'portefeuilles' }];
    }
    
    // Third slot must be ceinture
    if (selectedItems.length === 2) {
      return [{ label: 'Ceintures', type: 'itemgroup', value: 'ceintures' }];
    }
    
    return [];
  }

  if (packType === 'Pack Prestige') {
    const chemiseCount = selectedItems.filter(item => item.itemgroup_product === 'chemises').length;
    const beltCount = selectedItems.filter(item => item.itemgroup_product === 'ceintures').length;
    const cravateCount = selectedItems.filter(item => item.itemgroup_product === 'cravates').length;
    const portefeuilleCount = selectedItems.filter(item => item.itemgroup_product === 'portefeuilles').length;

    if (chemiseCount === 0) {
      return [{ label: 'Chemises Homme', type: 'itemgroup', value: 'chemises', additionalFilter: { field: 'category_product', value: 'homme' } }];
    }
    if (chemiseCount === 1 && beltCount === 0) {
      return [{ label: 'Ceintures', type: 'itemgroup', value: 'ceintures' }];
    }
    if (chemiseCount === 1 && beltCount === 1 && cravateCount === 0 && portefeuilleCount === 0) {
      return [
        { label: 'Cravates', type: 'itemgroup', value: 'cravates' },
        { label: 'Portefeuilles', type: 'itemgroup', value: 'portefeuilles' }
      ];
    }
    return [];
  }

  if (packType === 'Pack Trio') {
    // First step: only show ceintures if none selected
    if (selectedItems.length === 0) {
      return [{ label: 'Ceintures', type: 'itemgroup', value: 'ceintures' }];
    }

    // Second step: only show portefeuilles if ceinture is selected but no portefeuille
    if (selectedItems.length === 1 && selectedItems[0].itemgroup_product === 'ceintures') {
      return [{ label: 'Portefeuilles', type: 'itemgroup', value: 'portefeuilles' }];
    }

    // Third step: only show porte-clés if both ceinture and portefeuille are selected
    if (selectedItems.length === 2 && 
        selectedItems.some(item => item.itemgroup_product === 'ceintures') &&
        selectedItems.some(item => item.itemgroup_product === 'portefeuilles')) {
      return [{ label: 'Porte-clés', type: 'itemgroup', value: 'porte-cles' }];
    }

    // If the order is not correct, show no options
    return [];
  }

  if (packType === 'Pack Duo') {
    if (selectedItems.length === 0) {
      return [{ label: 'Portefeuilles', type: 'itemgroup', value: 'portefeuilles' }];
    }
    
    if (selectedItems.length === 1) {
      return [{ label: 'Ceintures', type: 'itemgroup', value: 'ceintures' }];
    }
    
    return [];
  }

  if (packType === 'Pack Mini Duo') {
    if (selectedItems.length === 0) {
      return [{ label: 'Porte-cartes', type: 'itemgroup', value: 'porte-cartes' }];
    }
    
    if (selectedItems.length === 1) {
      return [{ label: 'Porte-clés', type: 'itemgroup', value: 'porte-cles' }];
    }
    
    return [];
  }

  return [];
};
