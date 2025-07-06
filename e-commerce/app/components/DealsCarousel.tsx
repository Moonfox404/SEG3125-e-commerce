"use client";

import { Deal } from "../mock-data/MockDeals";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { MockProducts } from "../mock-data/MockProducts";

type DealsCarouselProps = {
  deals: Deal[];
  id: string;
};

const DealsCarousel = ({ deals, id }: DealsCarouselProps) => {
  const scrollBy = (offset: number) => {
    document.getElementById(id)?.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className="my-12 w-full bg-primary-content  py-8">
      <div className="relative flex items-center">
        {/* Left arrow */}
        <button
          aria-label="Scroll left"
          className="absolute left-0 z-10 p-2 bg-white rounded-full shadow hover:bg-amber-50 transition"
          onClick={() => scrollBy(-window.innerWidth * 0.6)}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-2xl text-amber-700"
          />
        </button>

        {/* Carousel track */}
        <div
          id={id}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 space-x-6"
        >
          {deals.map((deal, idx) => (
            <a
              key={deal.id}
              href={`/product/${deal.id}`}
              className="flex-shrink-0 snap-center w-[80vw] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-white rounded-lg shadow-lg transform hover:scale-105 transition"
            >
              <div className="relative">
                <img
                  src={deal.img}
                  alt={deal.details}
                  className="w-full h-48 object-contain rounded-t-lg"
                />
                <div className="absolute top-2 left-2 bg-accent text-white text-sm px-2 py-1 rounded flex items-center gap-1">
                  <FontAwesomeIcon icon={faTag} />
                  {(
                    1 -
                    MockProducts[Number(deal.id)].discountedPrice! /
                      MockProducts[Number(deal.id)].price
                  ).toFixed(2)}
                  % OFF
                </div>
              </div>
              <div className="p-4">
                <p className="font-medium text-gray-800 mb-2 line-clamp-2">
                  {deal.details}
                </p>
                {MockProducts[Number(deal.id)].discountedPrice && (
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-amber-700">
                      $
                      {MockProducts[Number(deal.id)].discountedPrice!.toFixed(
                        2
                      )}
                    </span>
                    <span className="text-sm line-through text-gray-400">
                      ${MockProducts[Number(deal.id)].price.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>

        {/* Right arrow */}
        <button
          aria-label="Scroll right"
          className="absolute right-0 z-10 p-2 bg-white rounded-full shadow hover:bg-amber-50 transition"
          onClick={() => scrollBy(window.innerWidth * 0.6)}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-2xl text-amber-700"
          />
        </button>
      </div>
    </section>
  );
};

export default DealsCarousel;
