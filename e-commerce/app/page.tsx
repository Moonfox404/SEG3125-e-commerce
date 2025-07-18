"use client";

import NavBar from "./components/NavBar";
import CategoriesTabs from "./components/CategoriesTabs";
import Hero from "./components/Hero";
import DealsCarousel from "./components/DealsCarousel";
import { MockProducts } from "./mock-data/MockProducts";
import ProductCard from "./components/ProductCard";
import Link from "next/link";
import Footer from "./components/Footer";
import { useState } from "react";
import { MockDeals } from "./mock-data/MockDeals";

export default function Home() {
  const [category, setCategory] = useState("");

  return (
    <div>
      <NavBar />
      <Hero />
      <section>
        <div className="flex justify-center px-10 sm:px-20 lg:px-30">
          <div className="h-20 w-full mt-15 mb-5 bg-secondary text-secondary-content text-center flex items-center justify-center">
            <h1 className="text-4xl">Deals of the Day</h1>
          </div>
        </div>
        <DealsCarousel id="deals-carousel" deals={MockDeals.sort((a, b) => {
          return MockProducts[Number(b.id)].price - MockProducts[Number(a.id)].price;  // show the most expensive deals first
        })} />
      </section>
      <section id="categories">
        <div className="px-10 sm:px-20 lg:px-30 min-h-20 my-15">
          <CategoriesTabs selected={category} setCategory={setCategory} />
        </div>
        <div className="px-10 sm:px-20 lg:px-30 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {MockProducts.filter((product) => product.category === category)
            .slice(0, 4)
            .map((product, idx) => {
              return (
                <div key={idx}>
                  <ProductCard product={product} />
                </div>
              );
            })}
        </div>
        <div className="flex justify-center">
          {category !== "" && (
            <Link
              href={"/browse/" + category.replace(/ /g, "-")}
              className="btn btn-primary btn-lg my-5"
            >
              See All &#8250;
            </Link>
          )}
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}
