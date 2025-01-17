import React from 'react';
import WelcomePackTemplate from './WelcomePackTemplate';

interface WelcomePackPorteCleProps {
  onCompose: () => void;
}

const WelcomePackPorteCle = ({ onCompose }: WelcomePackPorteCleProps) => {
  return <WelcomePackTemplate packType="Pack Porte-clé" onCompose={onCompose} />;
};

export default WelcomePackPorteCle;