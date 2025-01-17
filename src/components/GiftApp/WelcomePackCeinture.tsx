import React from 'react';
import WelcomePackTemplate from './WelcomePackTemplate';

interface WelcomePackCeintureProps {
  onCompose: () => void;
}

const WelcomePackCeinture = ({ onCompose }: WelcomePackCeintureProps) => {
  return <WelcomePackTemplate packType="Pack Ceinture" onCompose={onCompose} />;
};

export default WelcomePackCeinture;