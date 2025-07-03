export type Product = {
  id: string;
  name: string;
  details: string;
  rating: number;
  numRatings: number;
  price: number;
  discountedPrice?: number;
  styles?: string[];  // colours
  inStock: boolean;
  discounted: boolean;
};

export const MockProducts: Product[] = [
  {
    id: "0",
    name: "Couch",
    details: "For sitting",
    rating: 4.3,
    numRatings: 207,
    price: 5075.95,
    discountedPrice: 4975.97,
    styles: ["red", "green", "blue", "purple"],
    inStock: true,
    discounted: false
  }
]
