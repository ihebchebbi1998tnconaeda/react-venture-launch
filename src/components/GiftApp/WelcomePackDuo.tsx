import React from 'react';
import WelcomePackTemplate from './WelcomePackTemplate';

interface WelcomePackDuoProps {
  onCompose: () => void;
}

const WelcomePackDuo = ({ onCompose }: WelcomePackDuoProps) => {
  return <WelcomePackTemplate packType="Pack Duo" onCompose={onCompose} />;
};

export default WelcomePackDuo;