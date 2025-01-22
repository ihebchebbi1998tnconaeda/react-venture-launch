import { ChevronLeft, ChevronRight } from "lucide-react";

const Homme = () => {
  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8">Tenues de travail pour Homme</h1>
        
        {/* Product Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="relative group overflow-hidden rounded-lg">
            <img 
              src="/lovable-uploads/cdabb2a1-03dd-46f0-bda9-019861f8fb42.png" 
              alt="Vêtements de travail" 
              className="w-full h-[250px] object-cover"
            />
            <div className="absolute inset-0 bg-black/30">
              <span className="absolute top-4 left-4 text-white font-semibold">Vêtements de travail</span>
            </div>
          </div>
          
          <div className="relative group overflow-hidden rounded-lg">
            <img 
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118" 
              alt="Chaussures de travail" 
              className="w-full h-[250px] object-cover"
            />
            <div className="absolute inset-0 bg-black/30">
              <span className="absolute top-4 left-4 text-white font-semibold">Chaussures de travail</span>
            </div>
          </div>
          
          <div className="relative group overflow-hidden rounded-lg">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef" 
              alt="Gants de travail" 
              className="w-full h-[250px] object-cover"
            />
            <div className="absolute inset-0 bg-black/30">
              <span className="absolute top-4 left-4 text-white font-semibold">Gants de travail</span>
            </div>
          </div>
          
          <div className="relative group overflow-hidden rounded-lg">
            <img 
              src="https://images.unsplash.com/photo-1584982751601-97dcc096659c" 
              alt="Équipements de protection" 
              className="w-full h-[250px] object-cover"
            />
            <div className="absolute inset-0 bg-black/30">
              <span className="absolute top-4 left-4 text-white font-semibold">Équipements de protection</span>
            </div>
          </div>
          
          <div className="relative group overflow-hidden rounded-lg">
            <img 
              src="https://images.unsplash.com/photo-1584982751601-97dcc096659c" 
              alt="Accessoires" 
              className="w-full h-[250px] object-cover"
            />
            <div className="absolute inset-0 bg-black/30">
              <span className="absolute top-4 left-4 text-white font-semibold">Accessoires</span>
            </div>
          </div>
        </div>

        {/* Trending Section */}
        <section className="mb-16">
          <h2 className="text-xl font-bold mb-6">Les tendances de la protection</h2>
          
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="min-w-[200px] flex-shrink-0">
                  <div className="relative group">
                    {item % 2 === 0 && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Déstockage
                      </span>
                    )}
                    <img
                      src="https://images.unsplash.com/photo-1584982751601-97dcc096659c"
                      alt="Product"
                      className="w-full h-[200px] object-cover rounded-lg"
                    />
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Brand</p>
                    <h3 className="font-medium">Product Name</h3>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-sm line-through text-gray-400">59.99 € TTC</p>
                      <p className="font-bold text-primary">44.40 € TTC</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Homme;