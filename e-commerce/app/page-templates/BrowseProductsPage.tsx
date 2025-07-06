"use client";

import { act, Fragment, useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";
import { MockProducts, Product } from "../mock-data/MockProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

export type CategoryName = "all" | "Sofas and Couches" | "Tables and Chairs" | "Office" | "Home Decor";

const filters: Map<CategoryName, [string, string[]][]> = new Map([
  ["Sofas and Couches",
    [
      ["Type", ["Armchair", "Loveseat", "Sectional", "Sofabed", "3-Seater"]],
      ["Colour", ["White", "Grey", "Beige", "Brown", "Black", "Blue", "Red", "Green"]]
    ]
  ],
  ["Tables and Chairs",
    [
      ["Type", ["Dining Table", "Coffee Table", "Stool", "Chair", "Bench"]],
      ["Material", ["Glass", "Metal", "Wood", "Plastic"]],
      ["Colour", ["White", "Black", "Beige", "Brown"]]
    ]
  ],
  ["Office",
    [
      ["Type", ["Desk", "Shelving", "Chair", "Organisation"]],
      ["Material", ["Glass", "Metal", "Wood", "Plastic"]],
      ["Colour", ["White", "Black", "Beige", "Brown"]]
    ]
  ],
  ["Home Decor",
    [
      ["Type", ["Art", "Plant", "Light"]]
    ]
  ]
]);

const addFilter = (filterName: string, filterCategory: string, currentList: Set<Product>, allProducts: Product[]) => {
  const filtered = allProducts.filter((product) => {
    if (filterCategory === "Type") {
      return product.type === filterName;
    } else if (filterCategory === "Colour") {
      return (product.styles?.indexOf(filterName) ?? -1) !== -1;
    } else if (filterCategory === "Material") {
      return (product.material?.indexOf(filterName) ?? -1) !== -1;
    } else {
      // category
      return product.category === filterName;
    }
  });

  return currentList.union(new Set(filtered));
}

const BrowseProductsPage = ({
  products,
  category
}: {
  products: Product[],
  category: CategoryName
}) => {

  const FilterItem = ({
    filterName,
    filterCategory,
  }: {
    filterName: string;
    filterCategory: string;
  }) => {
    return (
      <label className="label my-3">
        <input
          type="checkbox"
          className="checkbox checkbox-sm checkbox-secondary"
          checked={activeFilters.get(filterCategory)?.has(filterName)}
          onChange={
            (evt) => {

              if (evt.target.checked) {
                if (!activeFilters.has(filterCategory)) {
                  activeFilters.set(filterCategory, new Set());
                }
                activeFilters.get(filterCategory)?.add(filterName);

              } else {
                activeFilters.get(filterCategory)?.delete(filterName);
              }

              // remake the filtered list
              let filtered = new Set(products);

              activeFilters.entries().forEach(([filterType, filterValues]) => {
                if (filterValues.size > 0) {
                  let filteredForCategory: Set<Product> = new Set();

                  filterValues.forEach((filterValue) => {
                    // OR behaviour between filters in same category
                    filteredForCategory = addFilter(filterValue, filterType, filteredForCategory, products);
                  })

                  // AND behaviour between filter categories
                  filtered = filtered.intersection(filteredForCategory);
                }
              })

              setFilteredProducts(filtered);
              setActiveFilters(new Map(activeFilters));
            }
          }
        />
        {filterName}
      </label>
    );
  };

  const FilterSection = ({
    filterCategory,
    filterValues
  }: {
    filterCategory: string;
    filterValues: string[]
  }) => {
    return (
      <>
        <div className="divider"></div>

        <div className="collapse collapse-plus">
          <input type="checkbox" defaultChecked />
          <div className="collapse-title p-0 flex items-center justify-between">
            <h2 className="text-primary lg:text-xl">{filterCategory}</h2>
          </div>
          <div className="collapse-content p-0 flex flex-col">
            {
              filterValues.map((filterName, idx) => {
                return <Fragment key={idx}>
                  <FilterItem filterName={filterName} filterCategory={filterCategory} />
                </Fragment>
              })
            }
          </div>
        </div>
      </>
    );
  }

  const [activeFilters, setActiveFilters] = useState<Map<string, Set<string>>>(new Map());
  const [priceMax, setPriceMax] = useState("6000");
  const [openFilters, setOpenFilters] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState(new Set(products));
  const [filteredByPriceProducts, setFilteredByPriceProducts] = useState(filteredProducts);

  useEffect(() => {
    const filtered = Array.from(filteredProducts).filter((products) => products.price <= Number(priceMax));
    setFilteredByPriceProducts(new Set(filtered));
  }, [priceMax, filteredProducts])

  return (
    <div className="my-10 grid grid-cols-5">
      {/* filters */}
      <div className="w-full col-span-5 lg:pr-10 lg:col lg:col-span-1">
        <div className="divider divider-start" >
          <h1 className="text-primary text-lg lg:text-3xl">Filters</h1>
        </div>

        <button
          className="btn btn-ghost"
          onClick={() => {
            setOpenFilters(!openFilters);
          }}
        >
          <FontAwesomeIcon icon={openFilters ? faMinus : faPlus} />
          {openFilters ? "Hide" : "Show"} Filters
        </button>

        {
          openFilters &&
          <>
            <button
              className="btn btn-ghost"
              onClick={
                () => {
                  setActiveFilters(new Map());
                  setFilteredProducts(new Set(products))
                  setPriceMax("6000");
                }
              }
            >
              <FontAwesomeIcon icon={faXmark} /> Clear all
            </button>

            {/* price */}
            <div>
              <div className="divider"></div>
              <h2 className="text-primary lg:text-xl">Price</h2>
              <div className="flex my-3">
                <span className="mr-3">$0</span>
                <input
                  id="price picker"
                  type="range"
                  min={0}
                  max={6000}
                  value={priceMax}
                  step={200}
                  className="range range-xs"
                  onChange={
                    (evt) => {
                      setPriceMax(evt.target.value);
                    }
                  }
                />
                <span className="ml-3">${priceMax}</span>
              </div>
            </div>

            {/* filters depending on category */}
            {
              category === "all" ?
                <div>
                  <div className="divider"></div>
                  <h2 className="text-primary lg:text-xl">Categories</h2>
                  <div className="flex flex-col">
                    <FilterItem filterName="Sofas and Couches" filterCategory="Category" />
                    <FilterItem filterName="Tables and Chairs" filterCategory="Category" />
                    <FilterItem filterName="Office" filterCategory="Category" />
                    <FilterItem filterName="Home Decor" filterCategory="Category" />
                  </div>
                </div>
                :
                <>
                  {
                    filters.get(category)?.map(([filterType, filterValues], idx) => {
                      return (
                        <div key={idx}>
                          <FilterSection filterCategory={filterType} filterValues={filterValues} />
                        </div>
                      );
                    })
                  }
                </>
            }
          </>
        }
      </div>

      {/* items */}
      <div className="col col-span-5 lg:col-span-4">
        <ProductGrid products={Array.from(filteredByPriceProducts)} />
      </div>
    </div>
  );
};

export default BrowseProductsPage;
