import React from 'react';
import WelcomePackTemplate from './WelcomePackTemplate';

interface WelcomePackMaletteProps {
  onCompose: () => void;
}

const WelcomePackMalette = ({ onCompose }: WelcomePackMaletteProps) => {
  return <WelcomePackTemplate packType="Pack Malette" onCompose={onCompose} />;
};

export default WelcomePackMalette;