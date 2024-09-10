import { Item } from '../types/item';
import { BoxType } from '../types/boxTypes';

export const createRequestBody = (
    items: Item[],
    selectedCarrier: string,
    selectedBoxTypes: BoxType[],
    boxTypeChoiceGoal: string 
  ) => {
  
    const itemSets = items.map((item, index) => ({
      refId: index,
      weight: item.weight, 
      dimensions: {
        x: item.height, 
        y: item.width,  
        z: item.length, 
      },
      name: item.product,
      quantity: item.quantity || 1, 
    }));
  
   
    const boxTypes = selectedCarrier === 'custom'
      ? selectedBoxTypes.map((box) => ({
          weightMax: box.weightMax, 
          name: `${box.dimensions.x}x${box.dimensions.y}x${box.dimensions.z}`, 
          dimensions: {
            x: box.dimensions.x,
            y: box.dimensions.y,
            z: box.dimensions.z,
          },
          rateTable: box.rateTable ? box.rateTable : undefined, 
        }))
      : []; 
  
  
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
  
