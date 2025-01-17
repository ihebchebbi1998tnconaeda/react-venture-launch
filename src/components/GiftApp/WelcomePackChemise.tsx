import React from 'react';
import WelcomePackTemplate from './WelcomePackTemplate';

interface WelcomePackChemiseProps {
  onCompose: () => void;
}

const WelcomePackChemise = ({ onCompose }: WelcomePackChemiseProps) => {
  return <WelcomePackTemplate packType="Pack Chemise" onCompose={onCompose} />;
};

export default WelcomePackChemise;