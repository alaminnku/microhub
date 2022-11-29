import { useUser } from "@context/User";
import styles from "@styles/HomePage.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BsPieChartFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { TfiReload } from "react-icons/tfi";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user && !user?.consumer && router.isReady) {
      router.push("/add-details");
    } else if (!user) {
      router.push("/login");
    }
  }, [user, router.isReady]);

  return (
    <main className={styles.home_page}>
      <div className={styles.top}>
        <div className={styles.left_arrow}>
          <MdKeyboardArrowRight />
        </div>
        <p>Today</p>
        <div className={styles.right_arrow}>
          <MdKeyboardArrowRight />
        </div>
      </div>

      <div className={styles.macros}>
        <div className={styles.chart_and_details}>
          <BsPieChartFill />

          <div>
            <p>Total macros</p>
            <span>1849 Calories</span>
          </div>
        </div>

        <AiOutlinePlus />
      </div>

      <div className={styles.breakfast}>
        <div className={styles.header}>
          <div>
            <p>Breakfast</p>
            <span>452 Calories</span>
          </div>
          <TfiReload />
        </div>

        <div className={styles.item}>
          <input type="checkbox" />
          <div className={styles.image}>
            <Image
              src="/food-placeholder.jpg"
              width={1}
              height={1}
              layout="responsive"
            />
          </div>
          <p>Chia Pudding with Fresh Fruit & Yoghurt</p>
        </div>

        <div className={styles.item}>
          <input type="checkbox" />
          <div className={styles.image}>
            <Image
              src="/food-placeholder.jpg"
              width={1}
              height={1}
              layout="responsive"
            />
          </div>
          <p>Fresh Orange Juice</p>
        </div>
      </div>

      <div className={styles.lunch}>
        <div className={styles.header}>
          <div>
            <p>Lunch</p>
            <span>452 Calories</span>
          </div>
          <TfiReload />
        </div>

        <div className={styles.item}>
          <input type="checkbox" />
          <div className={styles.image}>
            <Image
              src="/food-placeholder.jpg"
              width={1}
              height={1}
              layout="responsive"
            />
          </div>
          <p>White Bean & Veggie Salad</p>
        </div>
      </div>

      <div className={styles.dinner}>
        <div className={styles.header}>
          <div>
            <p>Dinner</p>
            <span>452 Calories</span>
          </div>
          <TfiReload />
        </div>

        <div className={styles.item}>
          <input type="checkbox" />
          <div className={styles.image}>
            <Image
              src="/food-placeholder.jpg"
              width={1}
              height={1}
              layout="responsive"
            />
          </div>
          <p>Poached Chicken & Quinoa Salad</p>
        </div>

        <div className={styles.item}>
          <input type="checkbox" />
          <div className={styles.image}>
            <Image
              src="/food-placeholder.jpg"
              width={1}
              height={1}
              layout="responsive"
            />
          </div>
          <p>Mediterranean Salad</p>
        </div>
      </div>

      <div className={styles.snacks}>
        <div className={styles.header}>
          <div>
            <p>Snacks</p>
            <span>452 Calories</span>
          </div>
          <TfiReload />
        </div>

        <div className={styles.item}>
          <input type="checkbox" />
          <div className={styles.image}>
            <Image
              src="/food-placeholder.jpg"
              width={1}
              height={1}
              layout="responsive"
            />
          </div>
          <p>Green Smoothie</p>
        </div>

        <div className={styles.item}>
          <input type="checkbox" />
          <div className={styles.image}>
            <Image
              src="/food-placeholder.jpg"
              width="60"
              height="60"
              layout="responsive"
            />
          </div>
          <p>Banana</p>
        </div>
      </div>

      <button>
        <AiOutlinePlus /> Add Item
      </button>
    </main>
  );
}
