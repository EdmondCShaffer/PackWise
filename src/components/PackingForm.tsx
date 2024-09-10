import React, { useState } from 'react';
import ItemForm from './ItemForm';
import ItemTable from './ItemTable';
import { Item } from '../types/item';
import './PackingForm.css';

interface PackingFormProps {
  items: Item[];
  onItemsChange: (items: Item[]) => void;
  onSubmit: () => void;
  isButtonDisabled: boolean;
}

const PackingForm: React.FC<PackingFormProps> = ({
  items,
  onItemsChange,
  onSubmit,
  isButtonDisabled,
}) => {
  const [item, setItem] = useState<Item>({
    product: '',
    height: 0,
    width: 0,
    length: 0,
    weight: 0,
    quantity: 1,
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]:
        name === 'quantity' ||
        name === 'height' ||
        name === 'width' ||
        name === 'length' ||
        name === 'weight'
          ? value === ''
            ? 0
            : Number(value)
          : value,
    }));
  };

  const handleAddOrUpdateItem = () => {
    if (editIndex !== null) {
      const updatedItems = items.map((currentItem, index) =>
        index === editIndex ? item : currentItem
      );
      onItemsChange(updatedItems);
      setEditIndex(null);
    } else {
      onItemsChange([...items, item]);
    }
    setItem({
      product: '',
      height: 0,
      width: 0,
      length: 0,
      weight: 0,
      quantity: 1,
    });
  };

  const handleEditItem = (index: number) => {
    setItem(items[index]);
    setEditIndex(index);
  };

  const handleDeleteItem = (index: number) => {
    onItemsChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="packaging-container">
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <ItemForm
          item={item}
          onInputChange={handleInputChange}
          onAddOrUpdate={handleAddOrUpdateItem}
          heading={
            editIndex !== null ? `Editing ${item.product}` : 'Add Product'
          }
        />
      </form>
      {items.length > 0 && (
        <ItemTable
          items={items}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
        />
      )}
      <button
        className="pack-button"
        type="button"
        disabled={isButtonDisabled}
        onClick={onSubmit}
      >
        Pack Items
      </button>
    </div>
  );
};

export default PackingForm;
