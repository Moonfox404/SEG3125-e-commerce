"use client";

import {
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";



const NavBar = () => {
  const { state } = useCart();
  const [showSearch, setShowSearch] = useState(false);
  let numberOfItems = state.reduce(
    (accumulator, currentItem) => accumulator + currentItem.quantity,
    0
  );

  useEffect(() => {
    document.getElementById("search-mobile")?.focus();
  }, [showSearch]);

  return (
    <nav>
      <div className="navbar px-5 md:px-10">
        <div className="flex navbar-start">
          <div className="w-30">
            {" "}
            {/* placeholder */}
            {/* logo */}
          </div>
          <div className="hidden md:block navbar-start">
            {/* search bar */}
            <SearchBar placeholder="I'm looking for..." onSearch={() => {}} />
          </div>
        </div>
        <div className="flex navbar-end justify-end">
          <div className="md:hidden">
            <button
              className="btn btn-circle btn-ghost text-lg"
              onClick={
                () => {
                  setShowSearch(!showSearch);
                }}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
          <div className="indicator">
            {/* cart */}
            {state.length > 0 && (
              <div className="absolute -right-0.5 -top-0.5 rounded-full text-xs bg-secondary text-secondary-content w-4 h-4 text-center">
                {numberOfItems}
              </div>
            )}
            <Link className="btn btn-circle btn-ghost text-lg" href="/cart">
              <FontAwesomeIcon icon={faCartShopping} />
            </Link>
          </div>
        </div>
      </div>
      {
        showSearch &&
        <div className="flex justify-center pb-5 w-full shadow md:hidden">
          <SearchBar id="search-mobile" placeholder="I'm looking for..." onSearch={() => {}} />
        </div>
      }
    </nav>
  );
};

export default NavBar;
