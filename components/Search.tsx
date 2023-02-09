import { FormEvent, useState } from "react";
import { BiSearch } from "react-icons/bi";
import styles from "@styles/Search.module.css";
import { axiosInstance } from "@utils/index";
import { ISearchProps } from "types";

export default function Search({ path, setResults }: ISearchProps) {
  const [searchValue, setSearchValue] = useState("");

  async function handleSearch(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await axiosInstance.get(`/${path}${searchValue}`);

      setResults(response.data.data.data.results);
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
