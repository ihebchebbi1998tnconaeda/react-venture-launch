import React from 'react';
import { Package2, Gift } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface PackTypeHeaderProps {
  packType: string;
}

const PackTypeHeader = ({ packType }: PackTypeHeaderProps) => {
  const { t } = useTranslation();

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <div className="inline-flex items-center justify-center gap-3 mb-4">
        <Package2 className="w-8 h-8 text-[#700100]" />
        <h1 className="text-3xl font-['WomanFontBold'] text-[#700100]">
          {packType}
        </h1>
        <Gift className="w-8 h-8 text-[#700100]" />
      </div>
      <p className="text-gray-600 max-w-2xl mx-auto">
        {t('giftApp.packTypeHeader.selectItems')}
      </p>
    </motion.div>
  );
};

export default PackTypeHeader;