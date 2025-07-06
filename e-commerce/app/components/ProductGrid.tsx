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
    <div className="size-full">
      {
        products.length > 0 ?
          <>
            <div className="flex items-center w-full">
              <p className="w-full text-center">{9 * (page - 1) + 1} - {Math.min(9 * page, products.length)} of {products.length} items</p>
            </div>

            {/* items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {
                products.slice(9 * (page - 1), Math.min(9 * page, products.length)).map((product, idx) => {
                  return (
                    <div key={idx} className="col">
                      <ProductCard product={product} />
                    </div>
                  );
                })
              }
            </div>

            {/* pagination */}
            <div className="flex justify-center items-center">
              <div className="w-fit">
                <Pagination numPages={Math.ceil(products.length / 9)} onToggle={(pg) => { setPage(pg); }} />
              </div>
            </div>
          </>
          :
          <div className="text-center">
            <p className="text-3xl my-5">Oops... No Items Found</p>
            <p className="text-lg">Consider making your search more broad or removing some filters.</p>
          </div>
      }
    </div>
  );
};

export default ProductGrid;
