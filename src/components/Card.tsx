import React, { useState } from 'react';
import './Card.css'; // Import the CSS file

const Card = ({ data }) => {
  const centsToUSD = (cents) => (cents / 100).toFixed(2);

  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const groupLeftovers = (leftovers) => {
    return leftovers.reduce((acc, leftover) => {
      const itemName = leftover.item.name || `Item ${leftover.item.refId}`;
      if (!acc[itemName]) {
        acc[itemName] = {
          quantity: 0,
          reason: leftover.item.message,
        };
      }
      acc[itemName].quantity += leftover.item.quantity || 1;
      return acc;
    }, {});
  };

  const groupItems = (items) => {
    return items.reduce((acc, itemData) => {
      const itemName = itemData.item.name;
      if (!acc[itemName]) {
        acc[itemName] = 0;
      }
      acc[itemName] += itemData.item.quantity || 1;
      return acc;
    }, {});
  };

  const shippingGoal =
    data.boxTypeChoiceGoalUsed === 'lowest-cost' ? 'Low Cost' : 'Minimum Boxes';

  const provider =
    data.provider.charAt(0).toUpperCase() + data.provider.slice(1);

  const groupedLeftovers = groupLeftovers(data.leftovers || []);

  const hasLeftovers = data.leftovers && data.leftovers.length > 0;
  const noBoxesUsed = data.boxes.length === 0;

  const getPercentageClass = (utilization) => {
    if (utilization < 0.5) return 'percentage-low';
    if (utilization < 0.75) return 'percentage-medium';
    return 'percentage-high';
  };

  if (noBoxesUsed && hasLeftovers) {
    return (
      <div className="card-container">
        <div className="card">
          <h2>Left Over Items</h2>
          {Object.entries(groupedLeftovers).map(
            ([itemName, { quantity, reason }], index) => (
              <div key={index}>
                <p>
                  <strong>Item:</strong> {itemName}
                </p>
                <p>
                  <strong>Quantity:</strong> {quantity}
                </p>
                <p>
                  <strong>Reason:</strong> {reason}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="card-container">
      <div className="card">
        <h2 className="card-packing-title">Packaging Details</h2>
        <div className="packing-info-container">
          <p>
            <strong>Goal:</strong> {shippingGoal}
          </p>
          <p>
            <strong>Box Provider: </strong>
            {provider} boxes
          </p>
          <p>
            <strong>Total Cost:</strong> ${centsToUSD(data.totalCost)}
          </p>
          <p>
            <strong>Total Boxes Used:</strong> {data.lenBoxes}
          </p>
          <p>
            <strong>Total Volume:</strong> {data.totalVolume} cubic units
          </p>
          <p>
            <strong>Total Weight:</strong> {data.totalWeight} units
          </p>
        </div>

        {hasLeftovers && (
          <div>
            <h3 className="left-over-title">Left Over Items: </h3>
            {Object.entries(groupedLeftovers).map(
              ([itemName, { quantity, reason }], index) => (
                <div className="left-over-items" key={index}>
                  <p>
                    <strong>Item:</strong> {itemName}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {quantity}
                  </p>
                  <p>
                    <strong>Reason:</strong> {reason}
                  </p>
                </div>
              )
            )}
          </div>
        )}

        {data.boxes.length > 0 && (
          <div className="accordion-container">
            {data.boxes.map((box, index) => {
              const groupedItems = groupItems(box.box.items);
              return (
                <div key={index} className="item">
                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    className="title-button"
                  >
                    <h3>Box: {index + 1}</h3>
                  </button>
                  {activeIndex === index && (
                    <div className="content">
                      <p>
                        <strong>Name:</strong> {box.box.name}
                      </p>
                      <p>
                        <strong>Price:</strong> ${centsToUSD(box.box.price)}
                      </p>
                      <p>
                        <strong>Dimensions:</strong>{' '}
                        {`h: ${box.box.dimensions.x}, w: ${box.box.dimensions.y}, l: ${box.box.dimensions.z}`}
                      </p>
                      <p>
                        <strong>Box Max Weight:</strong> {box.box.weightMax}
                      </p>
                      <p>
                        <strong>Weight Used:</strong> {box.box.weightUsed} units
                      </p>
                      <p
                        className={getPercentageClass(
                          box.box.weightUtilization
                        )}
                      >
                        <strong>Weight Utilization:</strong>{' '}
                        {(box.box.weightUtilization * 100).toFixed(2)}%
                      </p>
                      <h4>Items in this Box:</h4>
                      <ol>
                        {Object.entries(groupedItems).map(
                          ([itemName, count], itemIndex) => (
                            <li key={itemIndex}>
                              <p>
                                {itemName} ({count})
                              </p>
                            </li>
                          )
                        )}
                      </ol>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
