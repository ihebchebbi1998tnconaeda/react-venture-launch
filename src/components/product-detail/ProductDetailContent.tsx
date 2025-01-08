import React from 'react';
import { Info, ArrowRight } from 'lucide-react';

interface ProductDetailContentProps {
  description: string;
  material: string;
  color: string;
  id: number;
}

const ProductDetailContent = ({ description, material, color, id }: ProductDetailContentProps) => {
  // Split the description by \n and map each line to a paragraph with proper spacing
  const formattedDescription = description.split('\\n').map((line, index) => (
    <p key={index} className="text-gray-600 py-1">{line.trim()}</p>
  ));

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col space-y-2">
        {formattedDescription}
      </div>

      <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-[#700100] mt-1" />
          <div>
            <h4 className="font-medium text-gray-900">Détails du produit</h4>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li>• Matière: {material}</li>
              <li>• Couleur: {color}</li>
              <li>• Référence: {id.toString().padStart(6, '0')}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-3 bg-gray-50 p-4 rounded-lg text-sm">
        <div className="space-y-2 text-gray-600">
          <div className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-[#700100]" />
            Livraison gratuite en Tunisie à partir de 299 TND
          </div>
          <div className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-[#700100]" />
            L'ajout d'une personnalisation nécessitera un paiement en ligne
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailContent;