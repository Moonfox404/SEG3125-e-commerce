export type Product = {
  id: string;
  name: string;
  details: string;
  rating: number;
  numRatings: number;
  price: number;
  discountedPrice?: number;
  styles?: string[]; // colours
  inStock: boolean;
  discounted: boolean;
  images: number[]; // multiple product images
};

export const MockProducts: Product[] = [
  {
    id: "0",
    name: "Couch",
    details:
      "For sitting lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquet, tortor ac facilisis vestibulum, nisl leo malesuada libero, quis facilisis sem est quis ipsum.",
    rating: 4.5,
    numRatings: 207,
    price: 5075.95,
    discountedPrice: 3975.97,
    styles: ["red", "green", "blue", "purple", "purple"],
    inStock: true,
    discounted: true,
    images: [1, 2, 3, 4, 5],
  },
];
