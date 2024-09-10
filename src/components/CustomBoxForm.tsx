import React, { useState } from 'react';
import { BoxType, RATETABLE } from '../types/boxTypes';
import './CustomBoxForm.css';

interface CustomBoxFormProps {
  onAddBox: (box: BoxType) => void;
  existingBoxNames: string[];
}

const CustomBoxForm: React.FC<CustomBoxFormProps> = ({
  onAddBox,
  existingBoxNames,
}) => {
  const [box, setBox] = useState<BoxType>({
    name: '',
    refId: Date.now(),
    price: 0,
    weightMax: 0,
    dimensions: { x: 0, y: 0, z: 0 },
    itemsPerBoxMax: 0,
    rateTable: RATETABLE,
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('dimensions.')) {
      setBox((prevBox) => ({
        ...prevBox,
        dimensions: {
          ...prevBox.dimensions,
          [name.split('.')[1]]: Number(value),
        },
      }));
    } else {
      setBox((prevBox) => ({
        ...prevBox,
        [name]: name === 'name' ? value : Number(value),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (existingBoxNames.includes(box.name.trim())) {
      setError('Box name already exists. Please choose a different name.');
    } else {
      setError(null);
      onAddBox({ ...box, refId: Date.now() });
      setBox({
        name: '',
        refId: Date.now(),
        price: 0,
        weightMax: 0,
        dimensions: { x: 0, y: 0, z: 0 },
        itemsPerBoxMax: 0,
        rateTable: RATETABLE,
      });
    }
  };

  return (
    <form className="custom-box-form" onSubmit={handleSubmit}>
      <h3 className="custom-box-title">Add Custom Box</h3>

      <div className="form-group">
        <label htmlFor="name">Box Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={box.name}
          onChange={handleChange}
          placeholder="Enter box name"
          required
        />
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="price">Price (in cents)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={box.price || ''}
            onChange={handleChange}
            placeholder="Enter price"
            min="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="weightMax">Max Weight (in pounds)</label>
          <input
            type="number"
            id="weightMax"
            name="weightMax"
            value={box.weightMax || ''}
            onChange={handleChange}
            placeholder="Enter max weight"
            min="1"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dimensionsX">Dimensions X (in inches)</label>
          <input
            type="number"
            id="dimensionsX"
            name="dimensions.x"
            value={box.dimensions.x || ''}
            onChange={handleChange}
            placeholder="Enter X dimension"
            required
            min="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dimensionsY">Dimensions Y (in inches)</label>
          <input
            type="number"
            id="dimensionsY"
            name="dimensions.y"
            value={box.dimensions.y || ''}
            onChange={handleChange}
            placeholder="Enter Y dimension"
            required
            min="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dimensionsZ">Dimensions Z (in inches)</label>
          <input
            type="number"
            id="dimensionsZ"
            name="dimensions.z"
            value={box.dimensions.z || ''}
            onChange={handleChange}
            placeholder="Enter Z dimension"
            required
            min="1"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="itemsPerBoxMax">Max Items per Box</label>
        <input
          type="number"
          id="itemsPerBoxMax"
          name="itemsPerBoxMax"
          value={box.itemsPerBoxMax || ''}
          onChange={handleChange}
          placeholder="Enter max items per box"
          min="1"
        />
      </div>

      <button type="submit" className="add-box-button">
        Add Box
      </button>
    </form>
  );
};

export default CustomBoxForm;
