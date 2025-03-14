export const mapSize = {
  200: "Small",
  300: "Medium",
  400: "Large",
} as const;

export const mapType = {
  1: "Yogurt",
  2: "Smoothie",
} as const;

export const productSizes = Object.entries(mapSize).map(([value, name]) => ({
  name,
  value,
}));

export const productTypes = Object.entries(mapType).map(([value, name]) => ({
  name,
  value,
}));

export type ProductSize = keyof typeof mapSize;
export type ProductType = keyof typeof mapType;
