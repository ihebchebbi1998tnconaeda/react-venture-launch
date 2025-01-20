import { Product } from '@/types/product';
import { toast } from "@/hooks/use-toast";

export const validatePackSelection = (selectedItems: Product[], containerCount: number, packType: string) => {
  
  if (selectedItems.length !== containerCount) {
    toast({
      title: "Sélection incomplète",
      description: `Veuillez sélectionner ${containerCount} articles pour ce pack`,
      variant: "destructive",
    });
    return false;
  }

  switch (packType) {
    case 'Pack Premium': {
      // Check if first item is a cravate
      if (selectedItems[0]?.itemgroup_product !== 'cravates') {
        toast({
          title: "Sélection invalide",
          description: "Le premier article doit être une cravate",
          variant: "destructive",
        });
        return false;
      }

      // Check if second item is un portefeuille
      if (selectedItems[1]?.itemgroup_product !== 'portefeuilles') {
        toast({
          title: "Sélection invalide",
          description: "Le deuxième article doit être un portefeuille",
          variant: "destructive",
        });
        return false;
      }

      // Check if third item is a ceinture
      if (selectedItems[2]?.itemgroup_product !== 'ceintures') {
        toast({
          title: "Sélection invalide",
          description: "Le troisième article doit être une ceinture",
          variant: "destructive",
        });
        return false;
      }
      break;
    }

    case 'Pack Prestige': {
      const chemises = selectedItems.filter(item => item.itemgroup_product === 'chemises');
      const ceintures = selectedItems.filter(item => item.itemgroup_product === 'ceintures');
      const cravates = selectedItems.filter(item => item.itemgroup_product === 'cravates');
      const portefeuilles = selectedItems.filter(item => item.itemgroup_product === 'portefeuilles');
      
      if (chemises.length !== 1) {
        toast({
          title: "Sélection invalide",
          description: "Le Pack Prestige doit contenir exactement 1 chemise",
          variant: "destructive",
        });
        return false;
      }
      
      if (ceintures.length !== 1) {
        toast({
          title: "Sélection invalide",
          description: "Le Pack Prestige doit contenir exactement 1 ceinture",
          variant: "destructive",
        });
        return false;
      }

      // Check if either a cravate OR a portefeuille is selected (but not both)
      if ((cravates.length === 0 && portefeuilles.length === 0) || 
          (cravates.length > 0 && portefeuilles.length > 0)) {
        toast({
          title: "Sélection invalide",
          description: "Le Pack Prestige doit contenir soit 1 cravate, soit 1 portefeuille (pas les deux)",
          variant: "destructive",
        });
        return false;
      }

      if (cravates.length > 1 || portefeuilles.length > 1) {
        toast({
          title: "Sélection invalide",
          description: "Vous ne pouvez sélectionner qu'un seul accessoire (cravate ou portefeuille)",
          variant: "destructive",
        });
        return false;
      }
      break;
    }

    case 'Pack Trio': {
      const hasCeinture = selectedItems.filter(item => item.itemgroup_product === 'ceintures').length === 1;
      const hasPortefeuille = selectedItems.filter(item => item.itemgroup_product === 'portefeuilles').length === 1;
      const hasPorteCles = selectedItems.filter(item => item.itemgroup_product === 'porte-cles').length === 1;
      
      if (!hasCeinture) {
        toast({
          title: "Sélection invalide",
          description: "Le Pack Trio doit contenir exactement une ceinture",
          variant: "destructive",
        });
        return false;
      }

      if (!hasPortefeuille) {
        toast({
          title: "Sélection invalide",
          description: "Le Pack Trio doit contenir exactement un portefeuille",
          variant: "destructive",
        });
        return false;
      }

      if (!hasPorteCles) {
        toast({
          title: "Sélection invalide",
          description: "Le Pack Trio doit contenir exactement un porte-clés",
          variant: "destructive",
        });
        return false;
      }

      break;
    }

    case 'Pack Chemise': {
      const chemises = selectedItems.filter(item => item.itemgroup_product === 'chemises');
      if (chemises.length !== 1) {
        toast({
          title: "Sélection invalide",
          description: "Le Pack Chemise doit contenir exactement 1 chemise",
          variant: "destructive",
        });
        return false;
      }
      break;
    }

    case 'Pack Ceinture': {
      const ceintures = selectedItems.filter(item => item.itemgroup_product === 'ceintures');
      if (ceintures.length !== 1) {
        toast({
          title: "Sélection invalide",
          description: "Le Pack Ceinture doit contenir exactement 1 ceinture",
          variant: "destructive",
        });
        return false;
      }
      break;
    }

    case 'Pack Cravatte': {
      const cravates = selectedItems.filter(item => item.itemgroup_product === 'cravates');
      if (cravates.length !== 1) {
        toast({
          title: "Sélection invalide",
          description: "Le Pack Cravatte doit contenir exactement 1 cravate",
          variant: "destructive",
        });
        return false;
      }
      break;
    }

    case 'Pack Malette': {
      const malettes = selectedItems.filter(item => item.itemgroup_product === 'mallettes');
      if (malettes.length !== 1) {
        toast({
          title: "Sélection invalide",
          description: "Le Pack Malette doit contenir exactement 1 malette",
          variant: "destructive",
        });
        return false;
      }
      break;
    }

    case 'Pack Duo': {
      
      const hasPortefeuille = selectedItems.some(item => 
        item.itemgroup_product.toLowerCase() === 'portefeuilles' || 
        item.itemgroup_product.toLowerCase() === 'portefeuille'
      );
      
      const hasCeinture = selectedItems.some(item => 
        item.itemgroup_product.toLowerCase() === 'ceintures' || 
        item.itemgroup_product.toLowerCase() === 'ceinture'
      );

      if (!hasPortefeuille || !hasCeinture) {
        toast({
          title: "Sélection invalide",
          description: "Le Pack Duo doit contenir 1 portefeuille et 1 ceinture",
          variant: "destructive",
        });
        return false;
      }
      break;
    }

    case 'Pack Mini Duo': {
      
      const hasPorteCartes = selectedItems.some(item => 
        item.itemgroup_product.toLowerCase() === 'porte-cartes' || 
        item.itemgroup_product.toLowerCase() === 'porte-carte'
      );
      
      const hasPorteCles = selectedItems.some(item => 
        item.itemgroup_product.toLowerCase() === 'porte-cles' || 
        item.itemgroup_product.toLowerCase() === 'porte-clé' ||
        item.itemgroup_product.toLowerCase() === 'porte-cle'
      );

      if (!hasPorteCartes || !hasPorteCles) {
        toast({
          title: "Sélection invalide",
          description: "Le Pack Mini Duo doit contenir 1 porte-cartes et 1 porte-clés",
          variant: "destructive",
        });
        return false;
      }
      break;
    }
  }

  return true;
};
