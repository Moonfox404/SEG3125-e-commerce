"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SearchBarProps = {
  placeholder?: string;
  onSearch: (searchKey: string) => void;
  id?: string;
};

const SearchBar = ({ placeholder = "Search...", onSearch, id }: SearchBarProps) => {
  return (
    <div className="size-fit border-base-content border-b-2">
      <label className="input input-sm input-ghost">
        <FontAwesomeIcon icon={faSearch} />
        <input
          id={id}
          type="search"
          placeholder={placeholder}
          onKeyUp={(event) => {
            if (event.key == "Enter") {
              event.preventDefault();
              onSearch(event.currentTarget.value);
            }
          }}
        />
      </label>
    </div>
  );
};

export default SearchBar;
