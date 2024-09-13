import React from 'react';
import { Item } from '../types/item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import './ItemTable.css';

interface ItemTableProps {
  items: Item[];
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
}

const ItemTable: React.FC<ItemTableProps> = ({ items, onDelete, onEdit }) => {
  return (
    <div className="table-container">
      <h2 className="table-title">Products to be packed</h2>
      <table className="table">
        <thead className="table-head">
          <tr>
            <th className="table-header">Product</th>
            <th className="table-header">Height (x)</th>
            <th className="table-header">Width (y)</th>
            <th className="table-header">Length (z)</th>
            <th className="table-header">Weight</th>
            <th className="table-header">Quantity</th>
            <th className="table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? 'even-row' : 'odd-row'}
            >
              <td className="table-cell">{item.product}</td>
              <td className="table-cell">{item.height}</td>
              <td className="table-cell">{item.width}</td>
              <td className="table-cell">{item.length}</td>
              <td className="table-cell">{item.weight}</td>
              <td className="table-cell">{item.quantity}</td>
              <td className="table-cell">
                <button
                  type="button"
                  onClick={() => onEdit(index)}
                  className="edit-button"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(index)}
                  className="remove-button"
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;
