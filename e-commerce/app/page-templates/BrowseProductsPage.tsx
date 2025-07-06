"use client";

import { act, useState } from "react";
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

const BrowseProductsPage = ({
  products,
  category
}: {
  products?: Product[],
  category: CategoryName
}) => {
  const [activeFilters, setActiveFilters] = useState<Map<string, Set<string>>>(new Map());
  const [priceMax, setPriceMax] = useState("6000");

  const FilterItem = ({
    filterName,
    filterCategory,
    renderId
  }: {
    filterName: string;
    filterCategory: string;
    renderId?: string | number
  }) => {
    return (
      <label className="label my-3">
        <input
          key={renderId}
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
                return <FilterItem renderId={idx} filterName={filterName} filterCategory={filterCategory} />
              })
            }
          </div>
        </div>
      </>
    );
  }

  const [openFilters, setOpenFilters] = useState(true);

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
        <ProductGrid products={products ?? MockProducts} />
      </div>
    </div>
  );
};

export default BrowseProductsPage;
