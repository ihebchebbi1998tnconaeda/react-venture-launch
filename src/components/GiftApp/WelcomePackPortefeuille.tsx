import React from 'react';
import WelcomePackTemplate from './WelcomePackTemplate';

interface WelcomePackPortefeuilleProps {
  onCompose: () => void;
}

const WelcomePackPortefeuille = ({ onCompose }: WelcomePackPortefeuilleProps) => {
  return <WelcomePackTemplate packType="Pack Portefeuille" onCompose={onCompose} />;
};

export default WelcomePackPortefeuille;