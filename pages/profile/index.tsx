import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@context/User";
import { GiMeal, GiWeightScale } from "react-icons/gi";
import { GrTarget } from "react-icons/gr";
import logo from "@public/logo-white.svg";
import { IoIosBody } from "react-icons/io";
import profileImage from "@public/profile.png";
import styles from "@styles/Profile.module.css";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function ProfilePage() {
  const router = useRouter();
  const { isUserLoading, user } = useUser();

  // Check user
  useEffect(() => {
    if (!isUserLoading && !user && router.isReady) {
      router.push("/login");
    } else if (user && !user?.consumer) {
      router.push("/add-details");
    }
  }, [user, isUserLoading, router.isReady]);

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

            <Link href="/profile/update-weight">
              <a className={styles.update_weight}>
                <div className={styles.icon_and_text}>
                  <div className={styles.first_icon}>
                    <GiWeightScale />
                  </div>
                  <p>Update weight</p>
                </div>
                <div className={styles.last_icon}>
                  <MdKeyboardArrowRight />
                </div>
              </a>
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
