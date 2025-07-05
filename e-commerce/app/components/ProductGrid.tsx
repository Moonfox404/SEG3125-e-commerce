"use client";

import { useState } from "react";
import { Product } from "../mock-data/MockProducts"
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

const ProductGrid = ({
  products
}: {
  products: Product[]
}) => {
  const [page, setPage] = useState(1);

  return (
    <div className="grid grid-rows-16 size-full">
      {/* items */}
      <div className="row row-span-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {
          products.slice(9 * (page - 1), 9 * page).map((product, idx) => {
            return (
              <div key={idx} className="col">
                <ProductCard product={product} />
              </div>
            );
          })
        }
      </div>

      {/* pagination */}
      <div className="row row-span-1 flex justify-center items-center">
        <div className="w-fit">
          <Pagination numPages={Math.ceil(products.length / 9)} onToggle={(pg) => { setPage(pg); }} />
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
