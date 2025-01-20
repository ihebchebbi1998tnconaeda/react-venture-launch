import React, { useState } from "react";
import ProductCard from "../ProductCard";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "../../services/productsApi";
import { useParams, useLocation } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { Product } from "@/types/product";
import { PackageX } from "lucide-react";

const normalizeString = (str: string): string => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/-/g, " ");
};

interface ProductsSectionProps {
  isFromFooter?: boolean;
}

const NoProductsFound = () => (
  <div className="flex flex-col items-center justify-center py-12 px-4">
    <PackageX className="w-16 h-16 text-gray-400 mb-4" />
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      Aucun produit trouvé
    </h3>
    <p className="text-gray-500 text-center max-w-md">
      Désolé, nous n'avons pas trouvé de produits correspondant à vos critères. 
      Veuillez essayer une autre catégorie ou revenir plus tard.
    </p>
  </div>
);

const ProductsSection = ({ isFromFooter = false }: ProductsSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const location = useLocation();

  const pathSegments = location.pathname
    .split('/')
    .filter(segment => segment !== '' && segment !== 'category' && segment !== 'footer-category');

  console.log("Path segments for filtering:", pathSegments);

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', ...pathSegments, isFromFooter],
    queryFn: fetchAllProducts,
    select: (data) => {
      if (pathSegments[0] === 'univers-cadeaux') {
        return data
          .filter((product: Product) => 
            normalizeString(product.type_product) === 'univers-cadeaux'
          )
          .sort(() => Math.random() - 0.5)
          .slice(0, 6);
      }

      if (pathSegments.includes('accessoires') && pathSegments.length === 1) {
        return data.filter((product: Product) => 
          product.type_product.toLowerCase() === 'accessoires'
        );
      }

      if (pathSegments.length >= 2) {
        return data.filter((product: Product) => {
          const [type, category, itemgroup] = pathSegments;
          
          const normalizedType = normalizeString(type);
          const normalizedCategory = normalizeString(category);
          const productType = normalizeString(product.type_product);
          const productCategory = normalizeString(product.category_product);

        
          // Special case: if we're in pret-a-porter/homme/vestes OR outlet/homme/blazers, show outlet blazers
          if ((normalizedType === 'pret a porter' && 
              normalizedCategory === 'homme' && 
              itemgroup && 
              normalizeString(itemgroup) === 'vestes') ||
              (normalizedType === 'outlet' &&
              normalizedCategory === 'homme' &&
              itemgroup &&
              normalizeString(itemgroup) === 'blazers')) {
            return product.type_product === 'outlet' && 
                   product.itemgroup_product === 'blazers' && 
                   product.category_product.toLowerCase() === 'homme';
          }

          // If we have an itemgroup specified (e.g., chemises, cravates)
          if (itemgroup) {
            const normalizedItemgroup = normalizeString(itemgroup);
            const productItemgroup = normalizeString(product.itemgroup_product);

            return normalizedType === productType && 
                   normalizedCategory === productCategory && 
                   normalizedItemgroup === productItemgroup;
          }

          // If no itemgroup specified, just match type and category
          return normalizedType === productType && 
                 normalizedCategory === productCategory;
        });
      }

      // Default case: return all products
      return data;
    }
  });

  if (error) {
    console.error('Error loading products:', error);
    return <div className="text-center text-red-500">Failed to load products</div>;
  }

  const filteredProducts = products || [];
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full bg-gray-50">
      <div className={`container mx-auto px-4 ${isFromFooter ? 'py-12' : 'py-8'}`}>
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="w-full">
                <Skeleton className="h-[400px] w-full rounded-lg" />
              </div>
            ))}
          </div>
        ) : products?.length === 0 ? (
          <NoProductsFound />
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {currentProducts.map((product) => (
                <div key={product.id} className="w-full">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    className={`mx-2 px-4 py-2 rounded-md transition-all duration-300 ${
                      currentPage === index + 1
                        ? "bg-[#471818] text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsSection;