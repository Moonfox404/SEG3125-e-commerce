import Image from "next/image";
import ColourSquares from "./components/ColourSquares";
import ProductCard from "./components/ProductCard";
import { MockProducts } from "./mock-data/MockProducts";
import NavBar from "./components/NavBar";
import CategoriesTabs from "./components/CategoriesTabs";
import CategoriesNav from "./components/CategoriesNav";
import Hero from "./components/Hero";
import DealsCarousel from "./components/DealsCarousel";
import { MockDeals } from "./mock-data/MockDeals";

export default function Home() {
  return (
    <div>
      <NavBar itemsInCart={2} />
      <Hero />
      <DealsCarousel id="deals-carousel" deals={Array.from({length: 10}, (_, i) => {
        return {
          img: "/products/0.png",
          details: "A very good offer. (" + i + ")"
        }
      })}/>
      <CategoriesNav />
      <div className="w-full h-screen flex items-center justify-center">
        <ProductCard product={MockProducts[0]} />
      </div>
    </div>
  );
}
