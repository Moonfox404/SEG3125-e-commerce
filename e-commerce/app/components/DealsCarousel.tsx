"use client";

import { Deal } from "../mock-data/MockDeals"

type DealsCarouselProps = {
  deals: Deal[],
  id: string
};

const DealsCarousel = ({ deals, id }: DealsCarouselProps) => {
  return (
    <div className="flex justify-center items-center">
      <button
        className="btn btn-ghost btn-lg text-xl mr-1"
        onClick={() => { document.getElementById(id)?.scrollBy({ left: -200 }) }}
      >
        &#8249;
      </button>
      <div id={id} className="carousel px-20 w-[80vw] carousel-center md:carousel-start">
        {deals.map(
          (deal, idx) => {
            return <div key={idx} id={"slide" + idx} className="carousel-item w-[70vw] md:w-full lg:w-1/2 xl:w-1/3">
              <div className="card bg-base-300 m-5">
                <figure>
                  <img
                    src={deal.img}
                    alt="Promotional image"
                  />
                </figure>
                <div className="card-body">
                  <p>{deal.details}</p>
                </div>
              </div>
            </div>
          }
        )}
      </div>
      <button
        className="btn btn-ghost btn-lg text-xl ml-1"
        onClick={() => { document.getElementById(id)?.scrollBy({ left: 200 }) }}
      >
        &#8250;
      </button>
    </div>
  );
};

export default DealsCarousel;
