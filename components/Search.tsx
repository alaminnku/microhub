import { ISearchProps } from "types";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import styles from "@styles/Search.module.css";

export default function Search({ handleSearch }: ISearchProps) {
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
      <BiSearch onClick={(e) => handleSearch(e, searchValue)} />
    </form>
  );
}
