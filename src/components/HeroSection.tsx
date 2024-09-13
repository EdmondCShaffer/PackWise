import React from 'react';
import './HeroSection.css';

interface Props {
  logoSrc: string;
  missionStatement: string;
}

const HeroSection: React.FC<Props> = ({ logoSrc, missionStatement }) => {
  return (
    <div className="container">
      <img src={logoSrc} alt="Company Logo" className="logo" />
      <p className="mission-statement">{missionStatement}</p>
    </div>
  );
};

export default HeroSection;
