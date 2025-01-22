import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const products = [
  {
    id: 1,
    name: "Blouse Médicale",
    image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800",
    description: "Blouse médicale professionnelle"
  },
  {
    id: 2,
    name: "Uniforme Infirmier",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
    description: "Uniforme complet pour infirmiers"
  },
  {
    id: 3,
    name: "Tenue de Bloc",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800",
    description: "Tenue complète pour bloc opératoire"
  },
  {
    id: 4,
    name: "Blouse de Laboratoire",
    image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800",
    description: "Blouse professionnelle pour laboratoire"
  }
];

const Devis = () => {
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    productType: '',
    size: '',
    color: '',
    quantity: '',
    description: '',
    additionalNotes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast({
      title: "Demande envoyée",
      description: "Nous vous contacterons bientôt avec votre devis personnalisé.",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleProductSelect = (productId: number) => {
    setSelectedProduct(productId);
    const product = products.find(p => p.id === productId);
    if (product) {
      setFormData(prev => ({
        ...prev,
        productType: product.name
      }));
    }
  };

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-primary mb-6">Sélectionnez un produit</h2>
          
          <Carousel className="w-full max-w-4xl mx-auto mb-12">
            <CarouselContent>
              {products.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                  <div 
                    className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                      selectedProduct === product.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => handleProductSelect(product.id)}
                  >
                    <div className="aspect-square">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-200">{product.description}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-primary mb-6">Demande de Devis Personnalisé</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productType">Type de produit</Label>
                  <Input
                    id="productType"
                    name="productType"
                    required
                    value={formData.productType}
                    onChange={handleChange}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size">Taille</Label>
                  <select
                    id="size"
                    name="size"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    required
                    value={formData.size}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionnez une taille</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="custom">Sur mesure</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Couleur souhaitée</Label>
                  <Input
                    id="color"
                    name="color"
                    required
                    value={formData.color}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantité</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    required
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description détaillée</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Décrivez votre projet en détail..."
                  className="min-h-[100px]"
                  required
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Notes supplémentaires</Label>
                <Textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  placeholder="Autres informations importantes..."
                  value={formData.additionalNotes}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Envoyer la demande
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Devis;