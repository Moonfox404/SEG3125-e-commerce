import Image from "next/image";
import ColourSquares from "./components/ColourSquares";
import ProductCard from "./components/ProductCard";
import { MockProducts } from "./mock-data/MockProducts";

export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <ProductCard product={MockProducts[0]} />
    </div>
  );
}
