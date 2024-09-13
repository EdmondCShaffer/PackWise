import React, { useState } from 'react';
import { Item } from '../types/item';
import './ItemForm.css';

interface ItemFormProps {
  item: Item;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddOrUpdate: () => void;
  heading: string;
}

const ItemForm: React.FC<ItemFormProps> = ({
  item,
  onInputChange,
  onAddOrUpdate,
  heading,
}) => {
  const [errors, setErrors] = useState<Partial<Record<keyof Item, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof Item, string>> = {};
    if (!item.product) newErrors.product = 'Product name is required';
    if (item.height <= 0) newErrors.height = 'Height must be greater than 0';
    if (item.width <= 0) newErrors.width = 'Width must be greater than 0';
    if (item.length <= 0) newErrors.length = 'Length must be greater than 0';
    if (item.weight <= 0) newErrors.weight = 'Weight must be greater than 0';
    if (item.quantity < 1) newErrors.quantity = 'Quantity must be at least 1';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onAddOrUpdate();
    }
  };

  const buttonLabel = heading.includes('Editing')
    ? 'Update Product'
    : 'Add Product';

  return (
    <div className="form-container">
      <fieldset className="fieldset">
        <legend className="legend">{heading}</legend>

        <div className="form-group">
          <label htmlFor="product" className="label">
            Product
          </label>
          <input
            type="text"
            name="product"
            id="product"
            value={item.product}
            onChange={onInputChange}
            required
            className={`input ${errors.product ? 'input-error' : ''}`}
          />
          {errors.product && <div className="error-text">{errors.product}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="height" className="label">
            Height (x)
          </label>
          <input
            type="number"
            name="height"
            id="height"
            value={item.height || ''}
            onChange={onInputChange}
            required
            min="0.1"
            step="0.1"
            className={`input ${errors.height ? 'input-error' : ''}`}
          />
          {errors.height && <div className="error-text">{errors.height}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="width" className="label">
            Width (y)
          </label>
          <input
            type="number"
            name="width"
            id="width"
            value={item.width || ''}
            onChange={onInputChange}
            required
            min="0.1"
            step="0.1"
            className={`input ${errors.width ? 'input-error' : ''}`}
          />
          {errors.width && <div className="error-text">{errors.width}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="length" className="label">
            Length (z)
          </label>
          <input
            type="number"
            name="length"
            id="length"
            value={item.length || ''}
            onChange={onInputChange}
            required
            min="0.1"
            step="0.1"
            className={`input ${errors.length ? 'input-error' : ''}`}
          />
          {errors.length && <div className="error-text">{errors.length}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="weight" className="label">
            Weight
          </label>
          <input
            type="number"
            name="weight"
            id="weight"
            value={item.weight || ''}
            onChange={onInputChange}
            required
            min="0.1"
            step="0.1"
            className={`input ${errors.weight ? 'input-error' : ''}`}
          />
          {errors.weight && <div className="error-text">{errors.weight}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="quantity" className="label">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={item.quantity || ''}
            onChange={onInputChange}
            required
            min="1"
            className={`input ${errors.quantity ? 'input-error' : ''}`}
          />
          {errors.quantity && (
            <div className="error-text">{errors.quantity}</div>
          )}
        </div>

        <button type="button" onClick={handleSubmit} className="submit-button">
          {buttonLabel}
        </button>
      </fieldset>
    </div>
  );
};

export default ItemForm;
