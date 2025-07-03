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
    details: "For sitting lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquet, tortor ac facilisis vestibulum, nisl leo malesuada libero, quis facilisis sem est quis ipsum.",
    rating: 4.3,
    numRatings: 207,
    price: 5075.95,
    discountedPrice: 3975.97,
    styles: ["red", "green", "blue", "purple"],
    inStock: true,
    discounted: true
  }
]
