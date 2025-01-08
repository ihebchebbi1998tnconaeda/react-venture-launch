interface SectionContent {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}

const sectionContent: Record<string, Record<string, Record<string, SectionContent>>> = {
  "monde-fiori": {
    "introduction": {
      "histoire": {
        title: "Notre Histoire",
        subtitle: "HERITAGE",
        description: "DÉCOUVREZ L'HISTOIRE DE NOTRE MAISON, NOS VALEURS ET NOTRE ENGAGEMENT ENVERS L'EXCELLENCE ARTISANALE.",
        imageUrl: "/Articles/1.png"
      },
      "collection": {
        title: "Collections",
        subtitle: "ARTISANAT",
        description: "EXPLOREZ NOS COLLECTIONS EXCLUSIVES, CRÉÉES AVEC PASSION ET SAVOIR-FAIRE.",
        imageUrl: "/Articles/2.png"
      },
      "dna": {
        title: "Notre ADN",
        subtitle: "IDENTITÉ",
        description: "L'ESSENCE DE NOTRE MARQUE, NOTRE PHILOSOPHIE ET NOTRE VISION DU LUXE CONTEMPORAIN.",
        imageUrl: "/Articles/3.png"
      }
    }
  },
  "pret-a-porter": {
    "homme": {
      "costumes": {
        title: "Costumes",
        subtitle: "ÉLÉGANCE",
        description: "DES COSTUMES RAFFINÉS, TAILLÉS DANS LES PLUS BEAUX TISSUS ITALIENS.",
        imageUrl: "/Men1.png"
      },
      "blazers": {
        title: "Blazers",
        subtitle: "STYLE",
        description: "LA SOPHISTICATION AU QUOTIDIEN AVEC NOS BLAZERS INTEMPORELS.",
        imageUrl: "/Men2.png"
      }
    },
    "femme": {
      "chemises": {
        title: "Chemises",
        subtitle: "RAFFINEMENT",
        description: "L'ÉLÉGANCE AU FÉMININ À TRAVERS NOS CHEMISES DÉLICATES.",
        imageUrl: "/NewCollection/1.png"
      }
    }
  },
  "accessoires": {
    "homme": {
      "portefeuilles": {
        title: "Portefeuilles",
        subtitle: "CUIR",
        description: "ARTISANAT TUNISIEN D'EXCELLENCE, FAÇONNÉ DANS LES PLUS BEAUX CUIRS ITALIENS.",
        imageUrl: "/Articles/4.png"
      },
      "ceintures": {
        title: "Ceintures",
        subtitle: "LEATHER",
        description: "HANDCRAFTED IN TUNISIA WITH THE MOST PRESTIGIOUS ITALIAN LEATHER.",
        imageUrl: "/Articles/Main.png"
      },
      "cravates": {
        title: "Cravates",
        subtitle: "SOIE",
        description: "L'ÉLÉGANCE MASCULINE PAR EXCELLENCE, NOS CRAVATES SONT CONFECTIONNÉES DANS LES PLUS BELLES SOIES.",
        imageUrl: "/Men3.png"
      },
      "mallettes": {
        title: "Mallettes",
        subtitle: "BUSINESS",
        description: "L'ALLIANCE PARFAITE ENTRE FONCTIONNALITÉ ET ÉLÉGANCE POUR VOS JOURNÉES PROFESSIONNELLES.",
        imageUrl: "/Articles/2.png"
      }
    },
    "femme": {
      "sacs-a-main": {
        title: "Sacs à Main",
        subtitle: "LUXE",
        description: "DES CRÉATIONS UNIQUES, ALLIANT STYLE ET PRATICITÉ POUR LA FEMME MODERNE.",
        imageUrl: "/NewCollection/2.png"
      }
    }
  }
};

export const getSectionContent = (type: string, category: string, itemgroup: string): SectionContent => {
  const defaultContent: SectionContent = {
    title: "Fiori Collection",
    subtitle: "ARTISANAT",
    description: "DÉCOUVREZ NOS CRÉATIONS EXCLUSIVES, FAÇONNÉES AVEC PASSION ET SAVOIR-FAIRE EN TUNISIE.",
    imageUrl: "/Articles/Main.png"
  };

  try {
    return sectionContent[type]?.[category]?.[itemgroup] || defaultContent;
  } catch (error) {
    console.log("Error getting section content:", error);
    return defaultContent;
  }
};