import React from 'react';
import WelcomePackTemplate from './WelcomePackTemplate';

interface WelcomePackCravatteProps {
  onCompose: () => void;
}

const WelcomePackCravatte = ({ onCompose }: WelcomePackCravatteProps) => {
  return <WelcomePackTemplate packType="Pack Cravatte" onCompose={onCompose} />;
};

export default WelcomePackCravatte;