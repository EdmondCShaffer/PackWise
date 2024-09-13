import React from 'react';
import './HeroSection.css';

interface Props {
  logoSrc: string;
  missionStatement: string;
  onGetStarted: () => void;
}

const HeroSection: React.FC<Props> = ({
  logoSrc,
  missionStatement,
  onGetStarted,
}) => {
  return (
    <div className="container">
      <img src={logoSrc} alt="Company Logo" className="logo" />
      <p className="mission-statement">{missionStatement}</p>
      {/* <button className="getting-started" onClick={onGetStarted}>
        Get Started
      </button> */}
    </div>
  );
};

export default HeroSection;
