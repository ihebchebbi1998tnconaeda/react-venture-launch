import React from 'react';
import WelcomePackTemplate from './WelcomePackTemplate';

interface WelcomePackMiniDuoProps {
  onCompose: () => void;
}

const WelcomePackMiniDuo = ({ onCompose }: WelcomePackMiniDuoProps) => {
  return <WelcomePackTemplate packType="Pack Mini Duo" onCompose={onCompose} />;
};

export default WelcomePackMiniDuo;