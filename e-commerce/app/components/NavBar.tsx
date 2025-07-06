"use client";

import {
  faBars,
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import Logo from "./Logo";
import CategoriesNav from "./CategoriesNav";
import { useRouter } from "next/navigation";


const NavBar = ({
  withCategories = false
}: {
  withCategories?: boolean;
}) => {
  const router = useRouter();

  const onSearch = (searchKey: string) => {
    router.replace("/browse?search=" + searchKey)
  };

  const { state } = useCart();
  let numberOfItems = state.reduce(
    (accumulator, currentItem) => accumulator + currentItem.quantity,
    0
  );

  const [showSearch, setShowSearch] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    document.getElementById("search-mobile")?.focus();
  }, [showSearch]);

  return (
    <nav>
      <div className="navbar px-5 md:px-10">
        <div className="flex navbar-start">
          <div className="w-fit p-5 mr-5 text-primary">
            <a href="/">
              <Logo />
            </a>
          </div>
          <div className="hidden md:block navbar-start">
            {/* search bar */}
            <SearchBar placeholder="I'm looking for..." onSearch={onSearch} />
          </div>
        </div>
        <div className="flex navbar-end justify-end">
          <div className="md:hidden">
            <button
              className="btn btn-circle btn-ghost"
              onClick={
                () => {
                  setShowCategories(false);
                  setShowSearch(!showSearch);
                }}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
          {
            withCategories &&
            <div className="md:hidden">
              <button
                className="btn btn-circle btn-ghost"
                onClick={
                  () => {
                    setShowSearch(false);
                    setShowCategories(!showCategories);
                  }
                }
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
          }
          <div className="indicator">
            {/* cart */}
            {state.length > 0 && (
              <div className="absolute -right-0.5 -top-0.5 rounded-full text-xs bg-secondary text-secondary-content w-4 h-4 text-center">
                {numberOfItems}
              </div>
            )}
            <Link className="btn btn-circle btn-ghost md:text-lg" href="/cart">
              <FontAwesomeIcon icon={faCartShopping} />
            </Link>
          </div>
        </div>
      </div>
      {
        withCategories &&
        <div className="hidden md:block">
          <CategoriesNav />
        </div>
      }
      {
        withCategories && showCategories &&
        <div className="md:hidden">
          <CategoriesNav />
        </div>
      }
      {
        showSearch &&
        <div className="flex justify-center pb-5 w-full shadow md:hidden">
          <SearchBar id="search-mobile" placeholder="I'm looking for..." onSearch={onSearch} />
        </div>
      }
    </nav>
  );
};

export default NavBar;
