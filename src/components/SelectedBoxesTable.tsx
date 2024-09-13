import React from 'react';
import './SelectedBoxesTable.css';

interface Box {
  name: string;
  weightMax: number;
  itemsPerBoxMax: number;
  dimensions: {
    x: number;
    y: number;
    z: number;
  };
}

interface SelectedBoxesTableProps {
  boxes: Box[];
  onEdit: () => void;
}

const SelectedBoxesTable: React.FC<SelectedBoxesTableProps> = ({
  boxes,
  onEdit,
}) => {
  return (
    <div className="custom-box-container">
      <table className="table">
        <thead>
          <tr>
            <th className="headerCell">Name</th>
            <th className="headerCell">Max Weight (x)</th>
            <th className="headerCell">Max Items (y)</th>
            <th className="headerCell">Dimensions (z)</th>
          </tr>
        </thead>
        <tbody>
          {boxes.map((box, index) => (
            <tr key={index}>
              <td className="cell">{box.name}</td>
              <td className="cell">{box.weightMax}</td>
              <td className="cell">{box.itemsPerBoxMax}</td>
              <td className="cell">
                {box.dimensions.x} x {box.dimensions.y} x {box.dimensions.z}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onEdit} className="selected-boxes-button">
        Change box selections
      </button>
    </div>
  );
};

export default SelectedBoxesTable;
