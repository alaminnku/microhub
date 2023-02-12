import { FormEvent, useState } from "react";
import { BiSearch } from "react-icons/bi";
import styles from "@styles/Search.module.css";
import { axiosInstance } from "@utils/index";
import { ISearchProps } from "types";

export default function Search({ path, setResults }: ISearchProps) {
  const [searchValue, setSearchValue] = useState("");

  // Handle search
  async function handleSearch(e: FormEvent) {
    e.preventDefault();

    try {
      // Make request to the backend
      const response = await axiosInstance.get(`/${path}${searchValue}`);

      // Update state
      setResults(response.data.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form className={styles.search} onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <BiSearch onClick={handleSearch} />
    </form>
  );
}
