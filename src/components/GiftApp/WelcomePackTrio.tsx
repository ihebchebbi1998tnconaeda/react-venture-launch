import React from 'react';
import WelcomePackTemplate from './WelcomePackTemplate';

interface WelcomePackTrioProps {
  onCompose: () => void;
}

const WelcomePackTrio = ({ onCompose }: WelcomePackTrioProps) => {
  return <WelcomePackTemplate packType="Pack Trio" onCompose={onCompose} />;
};

export default WelcomePackTrio;