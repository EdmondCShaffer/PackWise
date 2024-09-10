import { Item } from '../types/item';
import { BoxType } from '../types/boxTypes';

export const createRequestBody = (
    items: Item[],
    selectedCarrier: string,
    selectedBoxTypes: BoxType[],
    boxTypeChoiceGoal: string // Add boxTypeChoiceGoal as a parameter
  ) => {
    // Convert item dimensions from cm to inches
    const itemSets = items.map((item, index) => ({
      refId: index,
      weight: item.weight, // Assuming weight is already in lbs
      dimensions: {
        x: item.height, // Assuming height is already in inches
        y: item.width,  // Assuming width is already in inches
        z: item.length, // Assuming length is already in inches
      },
      name: item.product,
      quantity: item.quantity || 1, // Default quantity to 1 if not provided
    }));
  
    // Create boxTypes including the rateTable for 'custom' selected provider
    const boxTypes = selectedCarrier === 'custom'
      ? selectedBoxTypes.map((box) => ({
          weightMax: box.weightMax, // Convert weight from grams to lbs if needed
          name: `${box.dimensions.x}x${box.dimensions.y}x${box.dimensions.z}`, // Format dimensions
          dimensions: {
            x: box.dimensions.x, // Dimensions are already in inches
            y: box.dimensions.y,
            z: box.dimensions.z,
          },
          rateTable: box.rateTable ? box.rateTable : undefined, // Add the rateTable if present
        }))
      : []; 
  
    // Set boxTypeSets only if selectedCarrier is not 'custom'
    const boxTypeSets = selectedCarrier !== 'custom'
      ? [selectedCarrier]
      : []; 
  
    return {
      boxTypeChoiceGoal: boxTypeChoiceGoal,
      itemSets,
      boxTypes: selectedCarrier === 'custom' ? boxTypes : undefined,
      boxTypeSets: selectedCarrier !== 'custom' ? boxTypeSets : undefined,
      includeScripts: false,
    };
  };
  
