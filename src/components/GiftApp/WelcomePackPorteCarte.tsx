import React from 'react';
import WelcomePackTemplate from './WelcomePackTemplate';

interface WelcomePackPorteCarteProps {
  onCompose: () => void;
}

const WelcomePackPorteCarte = ({ onCompose }: WelcomePackPorteCarteProps) => {
  return <WelcomePackTemplate packType="Pack Porte-carte" onCompose={onCompose} />;
};

export default WelcomePackPorteCarte;