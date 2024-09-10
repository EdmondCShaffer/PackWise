import React, { useState, useEffect } from 'react';
import { predefinedBoxTypes, BoxType } from '../types/boxTypes';
import CustomBoxForm from './CustomBoxForm'; // Import the custom box form component
import './BoxTypeSelection.css';

interface BoxTypeSelectionProps {
  selectedBoxTypes: BoxType[];
  onBoxTypeSelect: (boxTypes: BoxType[]) => void;
  onClose: () => void;
}

const BoxTypeSelection: React.FC<BoxTypeSelectionProps> = ({
  selectedBoxTypes,
  onBoxTypeSelect,
  onClose,
}) => {
  const [selected, setSelected] = useState<number[]>(
    selectedBoxTypes.map((box) => box.refId)
  );
  const [customBoxes, setCustomBoxes] = useState<BoxType[]>([]);

  useEffect(() => {
    const savedBoxes = localStorage.getItem('customBoxes');
    if (savedBoxes) {
      setCustomBoxes(JSON.parse(savedBoxes));
    }
  }, []);

  useEffect(() => {
    if (customBoxes.length > 0) {
      localStorage.setItem('customBoxes', JSON.stringify(customBoxes));
    }
  }, [customBoxes]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = parseInt(e.target.value, 10);
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((boxId) => boxId !== id)
        : [...prevSelected, id]
    );
  };

  const handleConfirm = () => {
    const selectedTypes = [
      ...predefinedBoxTypes.filter((box) => selected.includes(box.refId)),
      ...customBoxes.filter((box) => selected.includes(box.refId)),
    ];
    onBoxTypeSelect(selectedTypes);
    onClose();
  };

  const handleAddCustomBox = (newBox: BoxType) => {
    setCustomBoxes((prevBoxes) => [...prevBoxes, newBox]);
  };

  // Collect all box names for validation
  const allBoxNames = [
    ...predefinedBoxTypes.map((box) => box.name),
    ...customBoxes.map((box) => box.name),
  ];

  return (
    <div className="box-type-selection-container">
      <h2 className="box-type-selection-title">Select Box Types</h2>
      <div className="checkbox-group">
        {predefinedBoxTypes.map((box) => (
          <div key={box.refId} className="checkbox-container">
            <input
              type="checkbox"
              id={`box-${box.refId}`}
              value={box.refId}
              checked={selected.includes(box.refId)}
              onChange={handleCheckboxChange}
              className="checkbox"
            />
            <label htmlFor={`box-${box.refId}`} className="label">
              {box.name} (H:{box.dimensions.x} W:{box.dimensions.y} L:
              {box.dimensions.z})
            </label>
          </div>
        ))}
        {customBoxes.map((box) => (
          <div key={box.refId} className="checkbox-container">
            <input
              type="checkbox"
              id={`box-${box.refId}`}
              value={box.refId}
              checked={selected.includes(box.refId)}
              onChange={handleCheckboxChange}
              className="checkbox"
            />
            <label htmlFor={`box-${box.refId}`} className="label">
              {box.name} (H:{box.dimensions.x} W:{box.dimensions.y} L:
              {box.dimensions.z})
            </label>
          </div>
        ))}
      </div>
      <CustomBoxForm
        onAddBox={handleAddCustomBox}
        existingBoxNames={allBoxNames}
      />
      <button onClick={handleConfirm} className="confirm-button">
        Confirm
      </button>
    </div>
  );
};

export default BoxTypeSelection;
