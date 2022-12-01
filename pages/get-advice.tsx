import styles from "@styles/GetAdvice.module.css";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";

export default function GetAdvicePage() {
  return (
    <main className={styles.get_advice}>
      <section>
        <h2>Get Advice</h2>

        <div className={styles.search}>
          <div className={styles.icon_and_input}>
            <BiSearch />
            <input type="text" placeholder="Search" />
          </div>
          <BsFilter />
        </div>

        <div className={styles.professionals}>
          <div className={styles.professional}>
            <div className={styles.image}>
              <Image
                src="/profile.png"
                width={1}
                height={1}
                layout="responsive"
              />
            </div>
            <div className={styles.details}>
              <p>Nutritionist name</p>
              <span>Nutritionist - Location</span>
            </div>
          </div>

          <div className={styles.professional}>
            <div className={styles.image}>
              <Image
                src="/profile.png"
                width={1}
                height={1}
                layout="responsive"
              />
            </div>
            <div className={styles.details}>
              <p>Nutritionist name</p>
              <span>Nutritionist - Location</span>
            </div>
          </div>

          <div className={styles.professional}>
            <div className={styles.image}>
              <Image
                src="/profile.png"
                width={1}
                height={1}
                layout="responsive"
              />
            </div>
            <div className={styles.details}>
              <p>Nutritionist name</p>
              <span>Nutritionist - Location</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
