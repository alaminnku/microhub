import { useUser } from "@context/User";
import styles from "@styles/HomePage.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { TfiReload } from "react-icons/tfi";
import Image from "next/image";
import Link from "next/link";
import Macros from "@components/Macros";
import { axiosInstance } from "@utils/index";

interface INutritionist {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  createdAt: string;
  photo: string;
  linkToken: string;
  status: number;
}

export default function HomePage() {
  const router = useRouter();
  const { isUserLoading, user } = useUser();
  const [nutritionist, setNutritionist] = useState<INutritionist>();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login");
    } else if (user && !user.consumer) {
      router.push("/add-details");
    }
  }, [user, isUserLoading]);

  useEffect(() => {
    async function checkInviteFromNutritionist() {
      // Get nutritionist invitation
      try {
        const response = await axiosInstance.get(
          "/consumers/trainers/request "
        );

        setNutritionist(response.data.data.nutritionists[0]);
      } catch (err) {
        console.log(err);
      }

      // Get assigned nutritionist
      // try {
      //   const response = await axiosInstance.get("/consumers/trainer");

      //   console.log(response.data);
      // } catch (err) {
      //   console.log(err);
      // }
    }

    if (router.isReady) checkInviteFromNutritionist();
  }, [router.isReady]);

  async function handleInvite(status: number) {
    try {
      const response = await axiosInstance.post("/consumers/trainer/accept", {
        status,
        nutritionistId: nutritionist?.id,
      });

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className={styles.home_page}>
      {nutritionist && (
        <div className={styles.invitation}>
          <p>You've got an invite from a nutritionist</p>
          <div className={styles.buttons}>
            <button onClick={() => handleInvite(1)}>Confirm</button>
            <button onClick={() => handleInvite(-1)}>Reject</button>
          </div>
        </div>
      )}
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

      <button className={styles.add_item}>
        <AiOutlinePlus /> Add Item
      </button>
    </main>
  );
}
