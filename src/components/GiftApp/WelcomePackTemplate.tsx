import React from 'react';
import { useTranslation } from 'react-i18next';

interface PackTemplate {
  title: string;
  description: string;
  price: number;
  maxItems: number;
  allowedTypes: string[];
  image: string;
  videoUrl?: string;
}

interface PackTemplates {
  packDuo: PackTemplate;
  packTrio: PackTemplate;
  packQuatro: PackTemplate;
  packCostume: PackTemplate;
  packMariage: PackTemplate;
}

interface WelcomePackTemplateProps {
  onPackSelect: (packType: keyof PackTemplates) => void;
  selectedPack?: keyof PackTemplates;
  packTemplates: PackTemplates;
}

const WelcomePackTemplate: React.FC<WelcomePackTemplateProps> = ({
  onPackSelect,
  selectedPack,
  packTemplates
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.entries(packTemplates).map(([packType, pack]) => (
        <div
          key={packType}
          className={`relative rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${
            selectedPack === packType ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => onPackSelect(packType as keyof PackTemplates)}
        >
          <img
            src={pack.image}
            alt={pack.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{pack.title}</h3>
            <p className="text-gray-600">{pack.description}</p>
            {pack.videoUrl && (
              <div className="mt-4">
                <video
                  src={pack.videoUrl}
                  controls
                  className="w-full rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WelcomePackTemplate;