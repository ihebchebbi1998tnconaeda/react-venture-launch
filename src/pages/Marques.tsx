import { Layout } from "../components/Layout";

const Marques = () => {
  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8">Nos Marques</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* List of brands */}
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4"></div>
                <p className="font-medium">Brand {index + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Marques;