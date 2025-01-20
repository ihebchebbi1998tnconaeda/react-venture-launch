import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        translation: {
          // TopNavbar translations
          "freeShipping": "Livraison gratuite à partir de 299 TND",
          "contactUs": "CONTACTEZ-NOUS",
          
          // Hero translations
          "giftUniverse": "L'Univers Cadeaux",
          "newCollection": "Nouvelle Collection",
          "surMesure": "Le sur mesure",
          
          // NewCollection translations
          "discoverMore": "DÉCOUVRIR PLUS",
          "newCollectionTitle": "Nouvelle Collection",
          "newCollectionSubtitle": "Découvrez nos derniers designs et notre savoir-faire exceptionnel",
          
          // Footer translations
          "newsletter": {
            "subscribe": "Abonnez-vous aujourd'hui et obtenez 5% de réduction sur votre premier achat",
            "placeholder": "Entrez votre email",
            "button": "S'abonner",
            "success": "Inscription réussie !",
            "successMessage": "Merci de vous être inscrit à notre newsletter. Votre réduction de 5% a été appliquée à votre panier.",
            "alreadySubscribed": "Déjà inscrit",
            "alreadySubscribedMessage": "Vous êtes déjà inscrit à notre newsletter.",
            "error": "Erreur",
            "errorMessage": "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.",
            "title": "Offres Exclusives & Nouveautés",
            "description": "Inscrivez-vous à notre newsletter et bénéficiez de -5% sur votre première commande !",
            "signUp": "S'inscrire",
            "loading": "Inscription...",
            "terms": "En vous inscrivant, vous acceptez de recevoir nos newsletters et nos offres commerciales."
          },

          // WhatsApp translations
          "whatsapp": {
            "needHelp": "Besoin d'aide ?",
            "contactUs": "Contactez-nous sur WhatsApp",
            "chatNow": "Discuter maintenant"
          },

          // SubMenuSection translations
          "subMenuSections": {
            "notreMondeTitle": "Notre monde",
            "hommeTitle": "Homme",
            "femmeTitle": "Femme",
            "items": {
              "histoire": {
                "title": "Histoire",
                "description": "Collections élégantes pour mariage"
              },
              "collection": {
                "title": "Collection",
                "description": "Design festifs"
              },
              "dna": {
                "title": "DNA",
                "description": "Design festifs"
              },
              "costumes": {
                "title": "Costumes",
                "description": "Costumes élégants"
              },
              "blazers": {
                "title": "Blazers",
                "description": "Blazers raffinés"
              },
              "vestes": {
                "title": "Vestes",
                "description": "Vestes élégantes"
              },
              "chemises": {
                "title": "Chemises",
                "description": "Chemises classiques"
              },
              "pantalons": {
                "title": "Pantalons",
                "description": "Pantalons élégants"
              },
              "polo": {
                "title": "Polo",
                "description": "Polos élégants"
              },
              "robes": {
                "title": "Robes",
                "description": "Robes élégantes"
              },
              "vestesManteaux": {
                "title": "Vestes/Manteaux",
                "description": "Vestes et manteaux"
              },
              "portefeuilles": {
                "title": "Portefeuille",
                "description": "Portefeuilles élégants"
              },
              "ceintures": {
                "title": "Ceinture",
                "description": "Ceintures raffinées"
              },
              "cravates": {
                "title": "Cravate",
                "description": "Cravates élégantes"
              },
              "mallettes": {
                "title": "Mallette",
                "description": "Mallettes professionnelles"
              },
              "porteCartes": {
                "title": "Porte-carte",
                "description": "Porte-cartes élégants"
              },
              "porteCles": {
                "title": "Porte-clé",
                "description": "Porte-clés élégants"
              },
              "sacsMain": {
                "title": "Sacs à main",
                "description": "Sacs à main élégants"
              }
            }
          },

          // BrandLocation translations
          "brandLocation": {
            "findStore": "Trouver un magasin",
            "storeName": "Fiori Les Berges du Lac",
            "storeAddress": "Rue du Lac Tibériade , Les Berges du lac",
            "leaveReview": "Laissez votre avis",
            "yourName": "Votre nom",
            "yourNamePlaceholder": "Votre nom complet",
            "yourMessage": "Votre message",
            "messagePlaceholder": "Partagez votre expérience avec nous",
            "submitReview": "Envoyer votre avis",
            "thankYou": "Merci pour votre avis !",
            "feedbackImportant": "Votre feedback est très important pour nous."
          },

          // MainNavbar translations
          "mainNav": {
            "mondeFiori": "Le monde Fiori",
            "giftUniverse": "L'univers Cadeaux",
            "readyToWear": "Le prêt à porter",
            "accessories": "Accessoires",
            "surMesure": "Le sur mesure",
            "outlet": "Outlet"
          },

          // Mobile Menu translations
          "mobileMenu": {
            "menu": "Menu",
            "findStore": "Trouver une boutique",
            "contactUs": "Contactez-nous",
            "close": "Fermer le menu"
          },

          // Mobile Navigation translations
          "mobileNav": {
            "mondeFiori": {
              "title": "Le monde Fiori",
              "histoire": "Histoire",
              "collection": "Collection",
              "dna": "DNA"
            },
            "universCadeaux": {
              "title": "L'univers Cadeaux",
              "about": "À propos",
              "packPrestige": "Pack Prestige",
              "packPremium": "Pack Premium",
              "packTrio": "Pack Trio",
              "packDuo": "Pack Duo",
              "packMiniDuo": "Pack Mini Duo"
            },
            "pretAPorter": {
              "title": "Le prêt à porter",
              "costume": "Costume",
              "blazer": "Blazer",
              "vestes": "Vestes",
              "chemise": "Chemise",
              "pantalon": "Pantalon",
              "polo": "Polo"
            },
            "accessoires": {
              "title": "Accessoires",
              "portefeuille": "Portefeuille",
              "ceinture": "Ceinture",
              "cravate": "Cravate",
              "mallette": "Mallette",
              "porteCarte": "Porte-carte"
            },
            "outlet": {
              "title": "Outlet",
              "costumes": "Costumes",
              "blazers": "Blazers",
              "chemises": "Chemises",
              "pantalons": "Pantalons",
              "polo": "Polo",
              "chemisesFemme": "Chemises Femme",
              "robes": "Robes",
              "vestesManteaux": "Vestes/Manteaux"
            }
          }
        }
      }
    },
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
