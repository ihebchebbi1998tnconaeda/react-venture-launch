import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { ProductCategory } from "./types";
import { useState } from "react";

interface ProductSelectorProps {
  categories: ProductCategory[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string) => void;
}

const ProductSelector = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect 
}: ProductSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 w-full"
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredCategories.map((category) => (
          <Card
            key={category.id}
            onClick={() => {
              onCategorySelect(category.id);
              toast.success(`Catégorie ${category.name} sélectionnée`);
            }}
            className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedCategory === category.id
                ? "border-2 border-primary"
                : "hover:border-primary/50"
            }`}
          >
            <div className="flex flex-col space-y-3">
              <h3 className="text-lg font-semibold text-primary">{category.name}</h3>
              <p className="text-sm text-gray-600">
                {category.description || "Personnalisez votre produit unique"}
              </p>
              <p className="text-sm font-medium text-primary">
                À partir de {category.startingPrice || "30.00"} TND
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductSelector;