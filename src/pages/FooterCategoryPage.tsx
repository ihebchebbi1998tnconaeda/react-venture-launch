import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import Footer from "../components/Footer";
import ProductsSection from "../components/productsPages/ProductsSection";
import BrandNavbarSection from "@/components/productsPages/BrandNavbarSection";
import MainNavbar from "@/components/MainNavbar";
import { ArrowLeft } from "lucide-react";

const FooterCategoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathSegments = location.pathname
    .split('/')
    .filter(segment => segment !== '' && segment !== 'footer-category');

  const formatBreadcrumb = (segment: string) => {
    switch (segment.toLowerCase()) {
      case 'accessoires':
        return 'Accessoires';
      case 'femmes':
        return 'Femmes';
      case 'homme':
        return 'Hommes';
      case 'sacs-a-main':
        return 'Sacs à main';
      case 'pret-a-porter':
        return 'Prêt à porter';
      default:
        return segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col relative">
      <TopNavbar />
      <BrandNavbarSection />
      <div className="hidden lg:block">
        <MainNavbar/>
      </div>
      <div className="flex-grow bg-[#F9FAFB]">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-4"
              aria-label="Go back to home"
            >
              <ArrowLeft size={24} />
              <span>Retour à l'accueil</span>
            </button>
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <a href="/" className="text-gray-700 hover:text-primary">
                    Accueil
                  </a>
                </li>
                {pathSegments.map((segment, index) => (
                  <li key={index}>
                    <div className="flex items-center">
                      <span className="mx-2.5 text-gray-400">/</span>
                      <span 
                        className={
                          index === pathSegments.length - 1 
                            ? "text-primary font-medium" 
                            : "text-gray-700"
                        }
                      >
                        {formatBreadcrumb(segment)}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
        <ProductsSection isFromFooter={true} />
      </div>
      <Footer />
    </div>
  );
};

export default FooterCategoryPage;