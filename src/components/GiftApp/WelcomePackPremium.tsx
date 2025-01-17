import React from 'react';
import WelcomePackTemplate from './WelcomePackTemplate';

interface WelcomePackPremiumProps {
  onCompose: () => void;
}

const WelcomePackPremium = ({ onCompose }: WelcomePackPremiumProps) => {
  return <WelcomePackTemplate packType="Pack Premium" onCompose={onCompose} />;
};

export default WelcomePackPremium;