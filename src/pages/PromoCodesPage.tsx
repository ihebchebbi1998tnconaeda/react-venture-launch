import React from 'react';
import { Layout } from '@/components/Layout';
import { motion } from 'framer-motion';
import { Tag } from 'lucide-react';

const promoCodes = [
  { code: 'WELCOME10', discount: 10, description: 'Code de bienvenue' },
  { code: 'SUMMER20', discount: 20, description: 'Offre d\'été' },
  { code: 'SPECIAL30', discount: 30, description: 'Offre spéciale' },
  { code: 'LUNCH2024', discount: 25, description: 'Offre du déjeuner' }
];

const PromoCodesPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-serif text-[#1A1F2C]"
        >
          Codes Promo Disponibles
        </motion.h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {promoCodes.map((promo) => (
            <motion.div
              key={promo.code}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-3">
                <Tag className="text-[#700100]" />
                <h3 className="font-medium text-lg">{promo.code}</h3>
              </div>
              <p className="text-[#8E9196] mb-2">{promo.description}</p>
              <p className="text-[#700100] font-medium text-xl">-{promo.discount}%</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PromoCodesPage;