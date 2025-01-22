import { motion } from "framer-motion";

const metiers = [
  {
    title: 'Médical',
    image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c',
    description: 'Blouses, uniformes et accessoires pour les professionnels de santé',
    categories: ['Blouses', 'Uniformes', 'Chaussures', 'Accessoires']
  },
  {
    title: 'Industrie',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    description: 'Équipements de protection et vêtements techniques pour l\'industrie',
    categories: ['EPI', 'Combinaisons', 'Chaussures de sécurité', 'Gants']
  },
  {
    title: 'Bâtiment',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd',
    description: 'Tenues professionnelles adaptées aux métiers du BTP',
    categories: ['Vestes', 'Pantalons', 'Casques', 'Accessoires']
  },
  {
    title: 'Restauration',
    image: 'https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf',
    description: 'Tenues élégantes et pratiques pour la restauration',
    categories: ['Vestes de cuisine', 'Tabliers', 'Pantalons', 'Toques']
  },
  {
    title: 'Sécurité',
    image: 'https://images.unsplash.com/photo-1587578016785-bea53a782ea8',
    description: 'Équipements professionnels pour les agents de sécurité',
    categories: ['Uniformes', 'Chaussures', 'Accessoires', 'Protection']
  },
  {
    title: 'Transport',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d',
    description: 'Tenues adaptées aux professionnels du transport',
    categories: ['Uniformes', 'Vestes', 'Accessoires', 'Chaussures']
  }
];

const Metiers = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1582719478250-c89cae4dc85b)',
              filter: 'brightness(0.7)'
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative container mx-auto h-full flex flex-col justify-center px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            >
              Nos Métiers
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl"
            >
              Des solutions professionnelles adaptées à chaque secteur d'activité
            </motion.p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {metiers.map((metier, index) => (
              <motion.div
                key={metier.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={metier.image} 
                    alt={metier.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                    {metier.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    {metier.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {metier.categories.map((category) => (
                      <span 
                        key={category}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Metiers;