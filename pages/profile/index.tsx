import styles from "@styles/Profile.module.css";
import Image from "next/image";
import profileImage from "@public/profile.png";
import logo from "@public/logo-white.svg";
import { useUser } from "@context/User";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoIosBody } from "react-icons/io";
import { GiMeal } from "react-icons/gi";
import { GrTarget } from "react-icons/gr";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function ProfilePage() {
  const router = useRouter();
  const { isUserLoading, user } = useUser();

  // Check user
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login");
    } else if (
      !isUserLoading &&
      user &&
      Object.keys(user?.questionnaire).length === 0
    ) {
      router.push("/questionnaire");
    }
  }, [user, isUserLoading]);

  return (
    <main>
      {isUserLoading && <h2>Loading...</h2>}
      {!isUserLoading && user && (
        <section>
          <div className={styles.top}>
            <div className={styles.logo}>
              <Image src={logo} priority />
            </div>

            <div className={styles.image_and_name}>
              <div className={styles.profile_image}>
                <Image src={profileImage} />
              </div>

              <p className={styles.name}>
                <span>Welcome</span>
                {user.first_name} {user.last_name}
              </p>
            </div>
          </div>

          <div className={styles.details}>
            <Link href="/profile/my-body">
              <a className={styles.my_body}>
                <div className={styles.icon_and_text}>
                  <div className={styles.first_icon}>
                    <IoIosBody />
                  </div>
                  <p>My body</p>
                </div>
                <div className={styles.last_icon}>
                  <MdKeyboardArrowRight />
                </div>
              </a>
            </Link>

            <Link href="/profile/foods">
              <a className={styles.foods}>
                <div className={styles.icon_and_text}>
                  <div className={styles.first_icon}>
                    <GiMeal />
                  </div>
                  <p>Foods</p>
                </div>
                <div className={styles.last_icon}>
                  <MdKeyboardArrowRight />
                </div>
              </a>
            </Link>

            <Link href="/profile/goals">
              <a className={styles.goals}>
                <div className={styles.icon_and_text}>
                  <div className={styles.first_icon}>
                    <GrTarget />
                  </div>
                  <p>Goals</p>
                </div>
                <div className={styles.last_icon}>
                  <MdKeyboardArrowRight />
                </div>
              </a>
            </Link>
          </div>

          {/* <div className={styles.details}>
            <p className={styles.title}>Your summary</p>
            <div className={styles.item}>
              <IoIosBody />
              <p>Body mass index</p>
              <p>{user.consumer?.bmi}</p>
            </div>

            <div className={styles.item}>
              <IoIosBody />
              <p>Diet preference</p>
              <p>{user.consumer?.preferences}</p>
            </div>

            <div className={styles.item}>
              <IoIosBody />
              <p>Weight</p>
              <p>{user.consumer?.weight}</p>
            </div>

            <div className={styles.item}>
              <IoIosBody />
              <p>Healthy weight</p>
              <p>{user.consumer?.healthy_weight}</p>
            </div>

            <div className={styles.item}>
              <IoIosBody />
              <p>Height</p>
              <p>{user.consumer?.height}</p>
            </div>

            <div className={styles.item}>
              <IoIosBody />
              <p>TDEE</p>
              <p>{user.consumer?.tdee}</p>
            </div>

            <div className={styles.item}>
              <IoIosBody />
              <p>Activity level</p>
              <p>{user.consumer?.activity_level}</p>
            </div>
          </div> */}
        </section>
      )}
    </main>
  );
}
