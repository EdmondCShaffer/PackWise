
export const RATETABLE = {
  basePrice: 0,
  provider: "UPS",
  dimFactor: 139,
  priceIncreaseRate: 0,
  rates: [
    9.08, 9.4, 9.57, 9.72, 9.85, 9.99, 10, 10.43, 10.6, 11.07, 11.4, 11.71, 
    11.9, 12.19, 12.48, 12.65, 13.28, 13.5, 13.79, 14.02, 14.26, 14.56, 14.73, 
    15.02, 15.71, 17.38, 18.74, 19.43, 19.99, 20.59, 21.31, 21.67, 21.97, 
    22.24, 22.49, 23.09, 23.79, 24.27, 24.77, 25.24, 25.75, 26.19, 26.73, 
    27.39, 28.08, 28.57, 28.81, 29.07, 29.34, 29.51, 29.96, 30.45, 30.96, 
    31.39, 31.79, 31.98, 32.04, 32.37, 32.65, 32.98, 33.32, 33.57, 34.08, 
    34.54, 35.02, 35.44, 36.4, 36.67, 37.48, 37.89, 38.08, 38.66, 39.33, 
    41.14, 42.63, 44.25, 45.94, 47.36, 49.02, 50.34, 51.51, 53.2, 54.72, 
    56.36, 57.88, 59.49, 61.19, 63.12, 65.32, 67.44, 68.55, 70.18, 71.81, 
    73.51, 75.17, 76.78, 78.49, 80.2, 81.92, 83.41, 84.79, 85.62, 87.07, 
    88.44, 89.84, 91.26, 92.56, 93.84, 95.17, 96.3, 97.35, 98.36, 99.27, 
    100.42, 101.45, 102.48, 103.51, 104.53, 105.6, 107.39, 108.55, 109.27, 
    110.39, 111.4, 112.48, 113.57, 114.6, 114.79, 115.87, 116.97, 118.09, 
    119.21, 120.32, 121.41, 122.33, 123.36, 124.44, 125.58, 126.71, 127.83, 
    128.94, 129.48, 130.62, 131.77, 132.23, 133.36, 134.49, 135.35, 136.09, 
    137.24
  ],
  service: "Ground",
  weights: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 
    39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 
    57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 
    75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 
    93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 
    109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 
    124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 
    139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150
  ],
  zone: "2"
};

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

  export const predefinedBoxTypes: BoxType[] = [
    {
      name: 'Small Box',
      refId: 1,
      price: 500, // Example price in cents
      weightTare: 0.44, // Weight in pounds (200 grams)
      weightMax: 4.41,  // Max weight in pounds (2000 grams)
      dimensions: { 
        x: 11.81, // Dimensions in inches (30 cm)
        y: 7.87,  // (20 cm)
        z: 5.91,  // (15 cm)
      },
      rateTable: RATETABLE,
      reservedSpace: 0.1,
      itemsPerBoxMax: 10,
      itemSetsPerBoxMax: 5,
    },
    {
      name: 'Medium Box',
      refId: 2,
      price: 800,
      weightTare: 0.88, // Weight in pounds (400 grams)
      weightMax: 11.02, // Max weight in pounds (5000 grams)
      dimensions: { 
        x: 15.75, // Dimensions in inches (40 cm)
        y: 11.81, // (30 cm)
        z: 7.87,  // (20 cm)
      },
      rateTable: RATETABLE,
      reservedSpace: 0.1,
      itemsPerBoxMax: 20,
      itemSetsPerBoxMax: 10,
    },
    {
      name: 'Large Box',
      refId: 3,
      price: 1200,
      weightTare: 1.32, // Weight in pounds (600 grams)
      weightMax: 22.05, // Max weight in pounds (10000 grams)
      dimensions: { 
        x: 19.69, // Dimensions in inches (50 cm)
        y: 15.75, // (40 cm)
        z: 11.81, // (30 cm)
      },
      rateTable: RATETABLE,
      reservedSpace: 0.2,
      itemsPerBoxMax: 30,
      itemSetsPerBoxMax: 15,
    },
    {
      name: 'Extra Large Box',
      refId: 4,
      price: 1500,
      weightTare: 1.76, // Weight in pounds (800 grams)
      weightMax: 33.07, // Max weight in pounds (15000 grams)
      dimensions: { 
        x: 23.62, // Dimensions in inches (60 cm)
        y: 19.69, // (50 cm)
        z: 15.75, // (40 cm)
      },
      rateTable: RATETABLE,
      reservedSpace: 0.2,
      itemsPerBoxMax: 50,
      itemSetsPerBoxMax: 20,
    },
    {
      name: 'Flat Box',
      refId: 5,
      price: 400,
      weightTare: 0.33, // Weight in pounds (150 grams)
      weightMax: 3.31,  // Max weight in pounds (1500 grams)
      dimensions: { 
        x: 11.81, // Dimensions in inches (30 cm)
        y: 11.81, // (30 cm)
        z: 1.97,  // (5 cm)
      },
      rateTable: RATETABLE,
      reservedSpace: 0.05,
      itemsPerBoxMax: 5,
      itemSetsPerBoxMax: 3,
    },
    {
      name: 'Tall Box',
      refId: 6,
      price: 1000,
      weightTare: 1.10, // Weight in pounds (500 grams)
      weightMax: 17.64, // Max weight in pounds (8000 grams)
      dimensions: { 
        x: 11.81, // Dimensions in inches (30 cm)
        y: 11.81, // (30 cm)
        z: 23.62, // (60 cm)
      },
      rateTable: RATETABLE,
      reservedSpace: 0.15,
      itemsPerBoxMax: 15,
      itemSetsPerBoxMax: 10,
    },
    {
      name: 'Heavy Duty Box',
      refId: 7,
      price: 2000,
      weightTare: 2.20, // Weight in pounds (1000 grams)
      weightMax: 44.09, // Max weight in pounds (20000 grams)
      dimensions: { 
        x: 27.56, // Dimensions in inches (70 cm)
        y: 23.62, // (60 cm)
        z: 19.69, // (50 cm)
      },
      rateTable: RATETABLE,
      reservedSpace: 0.25,
      itemsPerBoxMax: 40,
      itemSetsPerBoxMax: 25,
    },
    {
      name: 'Compact Box',
      refId: 8,
      price: 600,
      weightTare: 0.55, // Weight in pounds (250 grams)
      weightMax: 6.61,  // Max weight in pounds (3000 grams)
      dimensions: { 
        x: 9.84,  // Dimensions in inches (25 cm)
        y: 7.87,  // (20 cm)
        z: 7.87,  // (20 cm)
      },
      rateTable: RATETABLE,
      reservedSpace: 0.1,
      itemsPerBoxMax: 8,
      itemSetsPerBoxMax: 4,
    },
  ];
  
  