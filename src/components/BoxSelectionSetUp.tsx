import React, { ChangeEvent } from 'react';
import './BoxSelection.css'; // Import the CSS file

interface provider {
  id: string;
  label: string;
}

interface BoxSelectionSetUpProps {
  boxProvider: string[];
  comparisonMode: boolean;
  packagingGoal: string;
  onBoxProviderChange: (carriers: string[]) => void;
  onComparisonModeChange: (enabled: boolean) => void;
  onCustomProviderSelected: () => void;
  onPackingStyleChange: (goal: string) => void;
}

const carriers: provider[] = [
  { id: 'fedex', label: 'FedEx Boxes' },
  { id: 'usps', label: 'USPS Boxes' },
  { id: 'custom', label: 'Custom Boxes' },
];

const BoxSelectionSetUp: React.FC<BoxSelectionSetUpProps> = ({
  boxProvider,
  comparisonMode,
  packagingGoal,
  onBoxProviderChange,
  onComparisonModeChange,
  onCustomProviderSelected,
  onPackingStyleChange,
}) => {
  const handleComparisonModeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === 'yes';
    onComparisonModeChange(value);
    if (!value) {
      onBoxProviderChange([boxProvider[0] || '']);
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (comparisonMode) {
      if (boxProvider.includes(value)) {
        onBoxProviderChange(
          boxProvider.filter((provider) => provider !== value)
        );
      } else {
        onBoxProviderChange([...boxProvider, value]);
      }
    } else {
      onBoxProviderChange([value]);
    }
    if (value === 'custom') {
      onCustomProviderSelected();
    }
  };

  return (
    <div className="box-selection-container">
      <h1 className="title">Select Your Packaging Preferences</h1>
      <div className="selection-group-container">
        <div className="checkbox-group">
          <h3 className="sub-title">Select Carriers for Packaging</h3>
          {carriers.map((provider) => (
            <div key={provider.id} className="checkbox-container">
              <input
                type="checkbox"
                id={provider.id}
                value={provider.id}
                checked={boxProvider.includes(provider.id)}
                onChange={handleCheckboxChange}
                className="checkbox"
              />
              <label htmlFor={provider.id} className="label">
                {provider.label}
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
    </div>
  );
};

export default BoxSelectionSetUp;
