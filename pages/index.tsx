import { useUser } from "@context/User";
import styles from "@styles/HomePage.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { TfiReload } from "react-icons/tfi";
import Image from "next/image";
import Link from "next/link";
import { IUser } from "types";
import Macros from "@components/Macros";
import { axiosInstance } from "@utils/index";

export default function HomePage() {
  const router = useRouter();
  const { isUserLoading, user, setUser } = useUser();

  // Check user
  useEffect(() => {
    if (!isUserLoading && !user && router.isReady) {
      router.push("/login");
    } else if (!isUserLoading && !user?.consumer && router.isReady) {
      router.push("/add-details");
    }
  }, [user, isUserLoading, router.isReady]);

  // Handle nutritionist invitation
  async function handleInvite(status: number) {
    // Push to the questionnaire page if the
    // client hasn't submitted the questionnaire yet
    if (!user?.questionnaire) {
      router.push("/questionnaire");
    } else {
      // Accept or reject invitation only when
      // the client has submitted the questionnaire
      try {
        const response = await axiosInstance.post("/consumers/trainer/accept", {
          status,
          nutritionistId: user.requested_nutritionists[0].id,
        });

        // Update user
        setUser((currState) => {
          if (currState) {
            // Destructure user data
            const { requested_nutritionists, ...rest } = currState;

            // Return all but requested nutritionist
            return rest as IUser;
          } else {
            return null;
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  // console.log(user);

  return (
    <main className={styles.home_page}>
      {isUserLoading && <h2>Loading...</h2>}

      {!isUserLoading && user && (
        <>
          {user?.requested_nutritionists?.length > 0 && (
            <div className={styles.invitation}>
              <p>
                You've got an invite from{" "}
                {user.requested_nutritionists[0].first_name}{" "}
                {user.requested_nutritionists[0].last_name}
              </p>
              <div className={styles.buttons}>
                <button onClick={() => handleInvite(1)}>Confirm</button>
                <button onClick={() => handleInvite(-1)}>Reject</button>
              </div>
            </div>
          )}

          <section className={styles.top}>
            <div className={styles.left_arrow}>
              <MdKeyboardArrowRight />
            </div>
            <p>Today</p>
            <div className={styles.right_arrow}>
              <MdKeyboardArrowRight />
            </div>
          </section>

          <Macros text="Total Macros" calories={1849} />

          <section className={styles.breakfast}>
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
          </section>

          <section className={styles.lunch}>
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
          </section>

          <section className={styles.dinner}>
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
          </section>

          <section className={styles.snacks}>
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
          </section>

          <button className={styles.add_item}>
            <AiOutlinePlus /> Add Item
          </button>
        </>
      )}
    </main>
  );
}
