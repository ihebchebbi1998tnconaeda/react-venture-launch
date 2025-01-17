import React from 'react';
import WelcomePackTemplate from './WelcomePackTemplate';

interface WelcomePackPrestigeProps {
  onCompose: () => void;
}

const WelcomePackPrestige = ({ onCompose }: WelcomePackPrestigeProps) => {
  return <WelcomePackTemplate packType="Pack Prestige" onCompose={onCompose} />;
};

export default WelcomePackPrestige;