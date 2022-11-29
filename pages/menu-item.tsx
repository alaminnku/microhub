import Macros from "@components/Macros";
import styles from "@styles/MenuItem.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { TfiReload } from "react-icons/tfi";

export default function MenuItemPage() {
  const router = useRouter();

  return (
    <main>
      <div className={styles.top}>
        <Image
          src="/food-placeholder.jpg"
          width={1}
          height={1}
          layout="responsive"
        />

        <Link href="/">
          <a className={styles.back_button}>
            <MdKeyboardArrowRight />
          </a>
        </Link>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <p>Chia Pudding with Fresh Fruit & Yoghurt</p>
          <span>10 mins prep. 0 mins cook</span>
        </div>

        <Macros text="Macros" calories={452} />

        <div className={styles.ingredients_top}>
          <p>Ingredients</p>
          <select name="" id="">
            <option value="">1 serve</option>
            <option value="">1 serve</option>
            <option value="">1 serve</option>
          </select>
        </div>

        <div className={styles.ingredients_content}>
          <div>
            <p>20g Chia seeds</p>
            <p>
              1/2 Cup Almost Milk <TfiReload />
            </p>
            <p>50g Fresh Mango</p>
            <p>3 tbs Low Fat Greek Yoghurt</p>
          </div>
        </div>

        <div className={styles.preparation}>
          <p>Prep</p>
          <p>
            Combine Chia Seeds with your choice of milk in a bowl. Put in the
            fridge overnight. Top with fresh fruit and a dollop of yoghurt.
          </p>
        </div>

        <div className={styles.buttons}>
          <button>Remove Item</button>

          <button>Change Item</button>
        </div>
      </div>
    </main>
  );
}
