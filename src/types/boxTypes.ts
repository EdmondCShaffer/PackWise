
export interface BoxType {
  name: string;
  refId: number;
  price: number;
  weightTare?: number;
  weightMax: number;
  dimensions: Point;
  reservedSpace?: number;
  itemsPerBoxMax: number;
  itemSetsPerBoxMax?: number;
  rateTable?: RateTable;
}

export interface Point {
  x: number;
  y: number;
  z: number;
}

export interface RateTable {
  provider: string;
  service?: string;
  zone?: string;
  rates?: number[];
  weights?: number[];
  priceIncreaseRate?: number;
  basePrice?: number;
  dimFactor?: number;
}

