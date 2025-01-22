import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

interface ProductGridProps {
  onAddToCart: () => void;
  products?: Product[];
}

const defaultProducts = [
  {
    id: 1,
    name: "Blouse Médicale Premium",
    price: "89,99 €",
    description: "Blouse médicale professionnelle, confortable et durable. Idéale pour les professionnels de santé.",
    image: "https://placehold.co/800x800",
    category: "Blouses",
  },
  {
    id: 2,
    name: "Uniforme Infirmier Elite",
    price: "79,99 €",
    description: "Uniforme complet pour infirmiers, design ergonomique et tissu respirant.",
    image: "https://placehold.co/800x800",
    category: "Uniformes",
  },
  {
    id: 3,
    name: "Tenue de Bloc Premium",
    price: "99,99 €",
    description: "Tenue complète pour bloc opératoire, stérile et confortable.",
    image: "https://placehold.co/800x800",
    category: "Tenues Spécialisées",
  },
  {
    id: 4,
    name: "Blouse de Laboratoire",
    price: "94,99 €",
    description: "Blouse professionnelle pour laboratoire, protection optimale.",
    image: "https://placehold.co/800x800",
    category: "Blouses",
  },
];

const ProductGrid = ({ onAddToCart, products = defaultProducts }: ProductGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const navigate = useNavigate();

  const categories = ["all", ...new Set(products.map(product => product.category))];
  
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition-colors duration-200 ${
              selectedCategory === category
                ? "bg-primary text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl cursor-pointer"
            onClick={() => handleProductClick(product.id)}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="p-4 space-y-2">
              <div className="text-xs text-gray-500">{product.category}</div>
              <h3 className="font-sans text-lg font-medium text-primary">{product.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-primary">{product.price}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart();
                  }}
                  className="rounded-full bg-primary px-4 py-2 text-sm text-white transition-colors hover:bg-primary/90"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;