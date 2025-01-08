import React from 'react';
import { Calendar, Truck } from 'lucide-react';
import { UserDetails } from '@/utils/userDetailsStorage';
import { motion } from 'framer-motion';

interface DeliveryDetailsProps {
  userDetails: UserDetails;
}

const DeliveryDetails = ({ userDetails }: DeliveryDetailsProps) => {
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6 mb-6"
    >
      <h2 className="text-xl font-medium mb-4 text-[#471818]">Détails de livraison</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-2 text-black">Adresse de livraison</h3>
          <p className="text-black">
            {userDetails.firstName} {userDetails.lastName}<br />
            {userDetails.address}<br />
            {userDetails.zipCode} {userDetails.country}<br />
            {userDetails.phone}
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2 text-black">Date de livraison estimée</h3>
            <div className="flex items-center gap-2 text-black">
              <Calendar size={20} />
              <span>{estimatedDelivery.toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-black">
            <Truck size={20} />
            <span>Livraison standard</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DeliveryDetails;
