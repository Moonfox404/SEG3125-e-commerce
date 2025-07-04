import Image from "next/image";
import ColourSquares from "./components/ColourSquares";
import ProductCard from "./components/ProductCard";
import { MockProducts } from "./mock-data/MockProducts";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="w-full h-screen flex items-center justify-center">
        <ProductCard product={MockProducts[0]} />
      </div>
    </div>
  );
}
