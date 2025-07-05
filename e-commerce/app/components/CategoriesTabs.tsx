"use client";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useEffect, useState } from "react";


type CategoryRadioInputProps = {
  category: string;
  mobile?: boolean;
}

type CategoriesTabsProps = {
  selected: string;
  setCategory: Dispatch<SetStateAction<string>>;
};


const CategoriesTabs = ({
  setCategory,
  selected
}: CategoriesTabsProps) => {
  const [openCategories, setOpenCategories] = useState(false);

  const CategoryRadioInput = ({
    category,
    mobile = false
  }: CategoryRadioInputProps) => {
    return <input
      type="radio"
      name="categories"
      aria-label={category}
      className={"tab " + (mobile ? "m-2 w-fit" : "")}
      checked={selected === category}
      onChange={(evt) => {
        if (evt.target.checked) {
          console.log(selected)
          setCategory(category);
        }
      }}
    />
  };

  return (
    <div className="w-full text-primary-content bg-primary flex flex-col justify-center">
      {/* mobile */}
      <div className="flex md:hidden justify-center items-center w-full h-20">
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => {
            setOpenCategories(!openCategories);
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h1>Categories</h1>
      </div>
      {
        openCategories &&
        <div className="p-2 md:hidden flex justify-evenly items-center menu tabs-border w-full">
          <CategoryRadioInput category="Sofas and Couches" mobile />
          <CategoryRadioInput category="Tables and Chairs" mobile />
          <CategoryRadioInput category="Office" mobile />
          <CategoryRadioInput category="Home Decor" mobile />
        </div>
      }

      {/* full screen */}
      <div className="p-2 hidden md:flex items-center justify-evenly tabs tabs-border w-full h-20">
        <CategoryRadioInput category="Sofas and Couches" />
        <CategoryRadioInput category="Tables and Chairs" />
        <CategoryRadioInput category="Office" />
        <CategoryRadioInput category="Home Decor" />
      </div>
    </div>
  );
};

export default CategoriesTabs;
