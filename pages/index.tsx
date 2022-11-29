import { useUser } from "@context/User";
import styles from "@styles/HomePage.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BsPieChartFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { TfiReload } from "react-icons/tfi";
import Image from "next/image";
import Link from "next/link";
import Macros from "@components/Macros";

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

      <Macros text="Total Macros" calories={1849} />

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
          <Link href="/menu-item">
            <a>
              <div className={styles.image}>
                <Image
                  src="/food-placeholder.jpg"
                  width={1}
                  height={1}
                  layout="responsive"
                />
              </div>
              <p>Chia Pudding with Fresh Fruit & Yoghurt</p>
            </a>
          </Link>
        </div>

        <div className={styles.item}>
          <input type="checkbox" />
          <Link href="/menu-item">
            <a>
              <div className={styles.image}>
                <Image
                  src="/food-placeholder.jpg"
                  width={1}
                  height={1}
                  layout="responsive"
                />
              </div>
              <p>Fresh Orange Juice</p>
            </a>
          </Link>
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
          <Link href="/menu-item">
            <a>
              <div className={styles.image}>
                <Image
                  src="/food-placeholder.jpg"
                  width={1}
                  height={1}
                  layout="responsive"
                />
              </div>
              <p>White Bean & Veggie Salad</p>
            </a>
          </Link>
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
          <Link href="/menu-item">
            <a>
              <div className={styles.image}>
                <Image
                  src="/food-placeholder.jpg"
                  width={1}
                  height={1}
                  layout="responsive"
                />
              </div>
              <p>Poached Chicken & Quinoa Salad</p>
            </a>
          </Link>
        </div>

        <div className={styles.item}>
          <input type="checkbox" />
          <Link href="/menu-item">
            <a>
              <div className={styles.image}>
                <Image
                  src="/food-placeholder.jpg"
                  width={1}
                  height={1}
                  layout="responsive"
                />
              </div>
              <p>Mediterranean Salad</p>
            </a>
          </Link>
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
          <Link href="/menu-item">
            <a>
              <div className={styles.image}>
                <Image
                  src="/food-placeholder.jpg"
                  width={1}
                  height={1}
                  layout="responsive"
                />
              </div>
              <p>Green Smoothie</p>
            </a>
          </Link>
        </div>

        <div className={styles.item}>
          <input type="checkbox" />
          <Link href="/menu-item">
            <a>
              <div className={styles.image}>
                <Image
                  src="/food-placeholder.jpg"
                  width="60"
                  height="60"
                  layout="responsive"
                />
              </div>
              <p>Banana</p>
            </a>
          </Link>
        </div>
      </div>

      <button>
        <AiOutlinePlus /> Add Item
      </button>
    </main>
  );
}
