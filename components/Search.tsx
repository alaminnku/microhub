import { ISearchProps } from "types";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import PuffLoader from "react-spinners/PuffLoader";
import styles from "@styles/Search.module.css";

export default function Search({ handleSearch, isSearching }: ISearchProps) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <form
      className={styles.search_form}
      onSubmit={(e) => handleSearch(e, searchValue)}
    >
      <input
        type="text"
        id="search"
        placeholder="Search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <button
        disabled={!searchValue || isSearching}
        onClick={(e) => handleSearch(e, searchValue)}
      >
        {isSearching ? <PuffLoader color="#132642" size={25} /> : <BiSearch />}
      </button>
    </form>
  );
}
