"use client";

import {
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { useCart } from "../context/CartContext";

// type NavBarProps = {
//   itemsInCart: number;
// };

const NavBar = () => {
  const { state } = useCart();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div>
      <div className="navbar max-w-screen">
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
              onClick={() => {
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
                {state.length}
              </div>
            )}
            <a className="btn btn-circle btn-ghost text-lg" href="/cart">
              <FontAwesomeIcon icon={faCartShopping} />
            </a>
          </div>
        </div>
      </div>

      {showSearch && (
        <div className="flex items-center justify-center w-full md:hidden">
          <SearchBar placeholder="I'm looking for..." onSearch={() => {}} />
        </div>
      )}
    </div>
  );
};

export default NavBar;
