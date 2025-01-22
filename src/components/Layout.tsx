import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Heart, ClipboardList, Search, PenLine, Trash2 } from "lucide-react";
import Footer from "./Footer";
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState([
    { id: 1, name: "Article 1", price: "120 DT", image: "/placeholder.svg" },
    { id: 2, name: "Article 2", price: "85 DT", image: "/placeholder.svg" }
  ]);
  const navigate = useNavigate();

  const handleCartClick = () => {
    console.log('Navigating to cart page');
    navigate('/cart');
  };

  const handleDevisClick = () => {
    navigate('/devis');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation - Social Media Bar */}
      <div className="w-full bg-primary py-2 text-sm text-white">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Livraison gratuite à partir de 255 DT</span>
            <span className="sm:hidden">Livraison &gt; 255 DT</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="w-full bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-primary" />
              ) : (
                <Menu className="h-6 w-6 text-primary" />
              )}
            </button>
            <Link to="/">
              <img src="/logo.png" alt="ELLES" className="h-14" />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full px-4 py-2 pl-10 border rounded-full focus:outline-none focus:border-secondary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {/* Icons Navigation */}
          <div className="flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-primary hover:text-primary/80 focus:outline-none">
                <Heart className="h-6 w-6" />
                <span className="text-sm hidden md:inline">Mes favoris</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-4 bg-white rounded-lg shadow-lg border border-gray-100">
                <div className="space-y-4">
                  <div className="text-lg font-semibold text-primary border-b pb-2">
                    Mes Articles Favoris
                  </div>
                  {favorites.length > 0 ? (
                    <div className="space-y-3">
                      {favorites.map((item) => (
                        <DropdownMenuItem key={item.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.price}</p>
                          </div>
                          <button className="text-red-500 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </DropdownMenuItem>
                      ))}
                      <div className="pt-2 border-t">
                        <button className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                          Voir tous les favoris
                        </button>
                      </div>
                    </div>
                  ) : (
                    <DropdownMenuItem disabled className="text-center py-8 text-gray-500">
                      Aucun favori
                    </DropdownMenuItem>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <button 
              onClick={handleDevisClick}
              className="hidden md:flex items-center gap-1 text-primary hover:text-primary/80"
            >
              <ClipboardList className="h-6 w-6" />
              <span className="text-sm">Devis</span>
            </button>
            <button 
              onClick={handleCartClick}
              className="flex items-center gap-1 text-primary hover:text-primary/80 cursor-pointer"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="text-sm">Mon panier ({cartCount})</span>
            </button>
          </div>
        </div>

        <div className={`md:relative md:inset-auto md:flex md:w-auto md:transform-none md:justify-start md:bg-transparent md:shadow-none ${
          isMenuOpen ? "block" : "hidden"
        }`}>
          <div className="flex h-full flex-col items-start space-y-6 p-6 md:flex-row md:items-center md:space-y-0 md:space-x-12 md:p-0 md:pb-6 container mx-auto">
            <div className="md:pl-16">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-12">
                <Link to="/metiers" className="nav-link w-full pb-6 text-left text-gray-600 hover:text-primary md:w-auto md:pb-6">
                  MÉTIERS
                </Link>
                <Link to="/marques" className="nav-link w-full pb-6 text-left text-gray-600 hover:text-primary md:w-auto md:pb-6">
                  MARQUES
                </Link>
                <a href="#" className="nav-link w-full pb-6 text-left text-gray-600 hover:text-primary md:w-auto md:pb-6">
                  SAISON
                </a>
                <a href="#" className="nav-link w-full pb-6 text-left text-red-500 flex items-center gap-2 md:w-auto md:pb-6">
                  <Heart className="h-4 w-4" />
                  SOLDES
                </a>
                <Link to="/personalization" className="nav-link w-full pb-6 text-left text-blue-500 flex items-center gap-2 md:w-auto md:pb-6">
                  <PenLine className="h-4 w-4" />
                  PERSONNALISATION
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
};
