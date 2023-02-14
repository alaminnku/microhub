import Link from "next/link";
import Image from "next/image";
import { useData } from "@context/Data";
import Search from "@components/Search";
import { FormEvent, useState } from "react";
import { axiosInstance } from "@utils/index";
import styles from "@styles/PreBuiltRecipes.module.css";

export default function PreBuiltRecipesPage() {
  const [isLoading, setLoading] = useState(false);
  const { preBuiltRecipes, setPreBuiltRecipes } = useData();

  async function searchRecipes(e: FormEvent, searchValue: string) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axiosInstance.get(
        `/recipes/search?search=${searchValue}&number=10`
      );

      setPreBuiltRecipes(response.data.data.results);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.pre_built_recipes}>
      <div className={styles.search}>
        <h2>Search recipes</h2>
        <Search handleSearch={searchRecipes} />
      </div>

      {preBuiltRecipes.length > 0 && (
        <div className={styles.recipes}>
          {preBuiltRecipes.map((preBuiltRecipe) => (
            <Link
              key={preBuiltRecipe.id}
              href={`/pre-built-recipes/${preBuiltRecipe.id}`}
            >
              <a className={styles.recipe}>
                <div className={styles.recipe_image}>
                  <Image
                    width={1}
                    height={1}
                    objectFit="cover"
                    layout="responsive"
                    src={preBuiltRecipe.image}
                  />
                </div>
                <p>{preBuiltRecipe.title}</p>
              </a>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
