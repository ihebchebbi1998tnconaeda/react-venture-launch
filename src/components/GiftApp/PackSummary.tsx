import React from 'react';
import { useTranslation } from 'react-i18next';
import { Product } from '@/types/product';
import { Textarea } from "@/components/ui/textarea";

interface PackSummaryProps {
  items: Product[];
  note: string;
  onNoteChange: (note: string) => void;
}

const PackSummary = ({ items, note, onNoteChange }: PackSummaryProps) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-[#700100]">
        {t('giftApp.packSummary.title')}
      </h3>
      
      {items.length > 0 ? (
        <div className="space-y-4">
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.name}</span>
                <span className="text-sm font-medium">{item.price} TND</span>
              </div>
            ))}
          </div>
          
          <div className="pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('giftApp.packSummary.noteLabel')}
            </label>
            <Textarea
              value={note}
              onChange={(e) => onNoteChange(e.target.value)}
              placeholder={t('giftApp.packSummary.notePlaceholder')}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-gray-500 font-medium">
            {t('giftApp.packSummary.emptyPack')}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {t('giftApp.packSummary.addItems')}
          </p>
        </div>
      )}
    </div>
  );
};

export default PackSummary;