import { BoxType } from "../types/boxTypes";
import { Item } from "../types/item";

export const createRequestBody = (
  items: Item[],
  rateTable: any, 
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

  const boxTypes = selectedBoxTypes.length > 0 ? selectedBoxTypes.map((box) => ({
    weightMax: box.weightMax,
    name: `${box.dimensions.x}x${box.dimensions.y}x${box.dimensions.z}`,
    dimensions: {
      x: box.dimensions.x,
      y: box.dimensions.y,
      z: box.dimensions.z,
    },
    rateTable: rateTable, 
  })) : undefined;

  return {
    boxTypeChoiceGoal,
    itemSets,
    boxTypes,
    includeScripts: false,
  };
};
