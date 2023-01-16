import { FormEvent } from "react";
import { BiSearch } from "react-icons/bi";
import styles from "@styles/Search.module.css";

export default function Search() {
  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    console.log("hello");
  }

  return (
    <form className={styles.search} onSubmit={handleSearch}>
      <input type="text" placeholder="Search" />
      <BiSearch onClick={handleSearch} />
    </form>
  );
}
