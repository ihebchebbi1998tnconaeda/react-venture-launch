import { useState } from 'react';
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Cart = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "T-shirt Personnalisé",
      price: 49.99,
      quantity: 1,
      image: "/placeholder.svg",
      size: "M",
      color: "Blanc"
    }
  ]);
  
  const { toast } = useToast();

  const updateQuantity = (id: number, change: number) => {
    console.log('Updating quantity for item:', id, 'change:', change);
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
    
    toast({
      description: "Quantité mise à jour",
      duration: 2000,
    });
  };

  const removeItem = (id: number) => {
    console.log('Removing item:', id);
    setItems(items.filter(item => item.id !== id));
    
    toast({
      description: "Article supprimé du panier",
      duration: 2000,
    });
  };

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal >= 255 ? 0 : 7.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-400" />
          <h2 className="text-2xl font-semibold">Votre panier est vide</h2>
          <p className="text-gray-600">Découvrez nos produits et commencez votre shopping</p>
          <Link to="/">
            <Button className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continuer mes achats
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Mon Panier</h1>
        <Link to="/" className="text-sm text-gray-600 hover:text-primary transition-colors">
          <span className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continuer mes achats
          </span>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <img 
                src={item.image} 
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                <div className="mt-1 text-sm text-gray-600">
                  <span className="mr-4">Taille: {item.size}</span>
                  <span>Couleur: {item.color}</span>
                </div>
                <p className="text-primary font-medium mt-1">{item.price.toFixed(2)} DT</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Diminuer la quantité"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Augmenter la quantité"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Supprimer l'article"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg space-y-4 sticky top-4">
            <h2 className="text-xl font-semibold">Résumé de la commande</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Sous-total</span>
                <span className="font-medium">{subtotal.toFixed(2)} DT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Livraison</span>
                <span className="font-medium">{shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)} DT`}</span>
              </div>
              {shipping > 0 && (
                <div className="py-2 px-3 bg-blue-50 text-blue-700 rounded-md text-sm">
                  Plus que {(255 - subtotal).toFixed(2)} DT pour la livraison gratuite
                </div>
              )}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{total.toFixed(2)} DT</span>
                </div>
              </div>
            </div>
            <Button className="w-full mt-6" size="lg">
              Procéder au paiement
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;