import { useState } from 'react';
import { Minus, Plus, ShoppingBag, ClipboardList, Heart } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';

// Mock related products (in a real app, this would come from an API)
const relatedProducts = [
  {
    id: 5,
    name: "Blouse Médicale Confort",
    price: "79,99 €",
    description: "Blouse médicale légère et confortable pour un usage quotidien.",
    image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800",
    category: "Blouses",
  },
  {
    id: 6,
    name: "Uniforme Chirurgical Pro",
    price: "129,99 €",
    description: "Uniforme chirurgical haute performance pour les professionnels.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
    category: "Uniformes",
  },
  {
    id: 7,
    name: "Tenue Médicale Premium",
    price: "149,99 €",
    description: "Ensemble médical premium pour un confort optimal.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800",
    category: "Tenues Spécialisées",
  },
];

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const productImages = [
    "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800",
    "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800",
  ];

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Product Section */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Left Side - Thumbnail Images */}
          <div className="lg:w-24 flex lg:flex-col gap-4 order-2 lg:order-1">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
                  selectedImage === index ? 'border-primary' : 'border-gray-200'
                }`}
              >
                <img
                  src={image}
                  alt={`Product view ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Center - Main Image */}
          <div className="lg:flex-1 order-1 lg:order-2">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src={productImages[selectedImage]}
                alt="Product main view"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="lg:w-1/3 space-y-6 order-3">
            <div>
              <h1 className="text-2xl font-bold text-primary mb-2">
                Bouchons d'oreilles détectables Portwest (50 paires)
              </h1>
              <p className="text-sm text-gray-600">Portwest</p>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <p className="text-sm">À partir de</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-red-600">44,40 €</span>
                <span className="text-gray-500 line-through">37,00 €</span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600">
                  Payez en 3 ou 4 fois à partir de 10€ sans intérêts
                </p>
                <span className="bg-black text-white text-xs px-2 py-1 rounded">
                  4x sans frais
                </span>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Couleur *
                </label>
                <select className="w-full border rounded-md p-2">
                  <option>Choisissez une option...</option>
                  <option>Bleu</option>
                  <option>Noir</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Taille *
                </label>
                <select className="w-full border rounded-md p-2">
                  <option>Choisissez une option...</option>
                  <option>Standard</option>
                </select>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border rounded hover:bg-gray-100"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-16 text-center border rounded p-2"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border rounded hover:bg-gray-100"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button className="w-full bg-primary text-white px-6 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-primary/90">
                <ShoppingBag className="w-5 h-5" />
                Ajouter au panier
              </button>
              <button className="w-full bg-secondary text-secondary-foreground px-6 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-secondary/90">
                <ClipboardList className="w-5 h-5" />
                Ajouter au devis
              </button>
            </div>

            {/* Additional Links */}
            <div className="space-y-2 pt-4 border-t">
              <button className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm w-full">
                <Heart className="w-4 h-4" />
                Ajouter à ma liste d'envie
              </button>
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <p className="text-xs">Livraison gratuite dès 89€ TTC</p>
              </div>
              <div className="text-center">
                <p className="text-xs">Paiement 3x CB sans frais</p>
              </div>
              <div className="text-center">
                <p className="text-xs">Retour gratuit 60 jours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-primary mb-8">
            Produits similaires
          </h2>
          <ProductGrid products={relatedProducts} onAddToCart={() => {}} />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;