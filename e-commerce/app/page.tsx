import NavBar from "./components/NavBar";
import CategoriesTabs from "./components/CategoriesTabs";
import Hero from "./components/Hero";
import DealsCarousel from "./components/DealsCarousel";
import { MockProducts } from "./mock-data/MockProducts";
import ProductCard from "./components/ProductCard";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <NavBar />
      <Hero />
      <section>
        <div className="flex justify-center px-10 sm:px-20 md:px-30">
          <div className="h-20 w-full mt-15 mb-5 bg-secondary text-secondary-content text-center flex items-center justify-center">
            <h1 className="text-4xl">Deals of the Day</h1>
          </div>
        </div>
        <DealsCarousel id="deals-carousel" deals={
          Array.from({ length: 10 }, (_, i) => {
            return {
              img: "/products/0.png",
              details: "A very good offer. (" + i + ")"
            }
          })
        } />
      </section>
      <section id="categories">
        <div className="px-10 sm:px-20 md:px-30 h-20 my-15">
          <CategoriesTabs />
        </div>
        <div className="px-10 sm:px-20 md:px-30 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {
            Array.from({length: 4}, (_, idx) => <div key={idx}><ProductCard product={MockProducts[0]} /></div>)
          }
        </div>
        <div className="flex justify-center">
          <Link href="#" className="btn btn-primary btn-lg my-5">See All &#8250;</Link>
        </div>
      </section>
    </div>
  );
}
