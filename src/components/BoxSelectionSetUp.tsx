import React from 'react';
import './BoxSelectionSetUp.css';

interface Carrier {
  id: string;
  label: string;
}

interface BoxSelectionSetUpProps {
  selectedCarriers: string[];
  comparisonMode: boolean;
  packagingGoal: string;
  onCarrierChange: (carriers: string[]) => void;
  onComparisonModeChange: (enabled: boolean) => void;
  onPackingStyleChange: (goal: string) => void;
  onSelectBoxes: () => void;
}

const carriers: Carrier[] = [
  { id: 'ups', label: 'UPS' },
  { id: 'fedex', label: 'FedEx' },
  { id: 'usps', label: 'USPS' },
];

const BoxSelectionSetUp: React.FC<BoxSelectionSetUpProps> = ({
  selectedCarriers,
  comparisonMode,
  packagingGoal,
  onCarrierChange,
  onComparisonModeChange,
  onPackingStyleChange,
  onSelectBoxes,
}) => {
  const handleComparisonModeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value === 'yes';
    onComparisonModeChange(value);
  };

  const handleCarrierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (comparisonMode) {
      if (selectedCarriers.includes(value)) {
        onCarrierChange(selectedCarriers.filter((item) => item !== value));
      } else {
        onCarrierChange([...selectedCarriers, value]);
      }
    } else {
      onCarrierChange([value]);
    }
  };

  return (
    <div className="box-selection-container">
      <h1 className="title">Select Your Packaging Preferences</h1>
      <div className="selection-group-container">
        <div className="checkbox-group">
          <h3 className="sub-title">Select Carriers</h3>
          {carriers.map((carrierOption) => (
            <div key={carrierOption.id} className="checkbox-container">
              <input
                type="checkbox"
                id={carrierOption.id}
                value={carrierOption.id}
                checked={selectedCarriers.includes(carrierOption.id)}
                onChange={handleCarrierChange}
                className="checkbox"
              />
              <label htmlFor={carrierOption.id} className="label">
                {carrierOption.label}
              </label>
            </div>
          ))}
        </div>

        <div className="radio-group">
          <h3 className="sub-title">Compare Rates and Packaging</h3>
          <label className="radio-label">
            <input
              type="radio"
              name="comparisonMode"
              value="yes"
              checked={comparisonMode}
              onChange={handleComparisonModeChange}
              className="radio"
            />
            Yes
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="comparisonMode"
              value="no"
              checked={!comparisonMode}
              onChange={handleComparisonModeChange}
              className="radio"
            />
            No
          </label>
        </div>
        <div className="radio-group">
          <h3 className="sub-title">Packaging Goal</h3>
          <label className="radio-label">
            <input
              type="radio"
              name="packingGoal"
              value="lowest-cost"
              checked={packagingGoal === 'lowest-cost'}
              onChange={(e) => onPackingStyleChange(e.target.value)}
              className="radio"
            />
            Cost Effective
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="packingGoal"
              value="most-items"
              checked={packagingGoal === 'most-items'}
              onChange={(e) => onPackingStyleChange(e.target.value)}
              className="radio"
            />
            Minimum Boxes
          </label>
        </div>
      </div>
      <div className="select-boxes-container">
        <button className="select-boxes-button" onClick={onSelectBoxes}>
          Select boxes
        </button>
      </div>
    </div>
  );
};

export default BoxSelectionSetUp;
