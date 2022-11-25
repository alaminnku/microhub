import styles from "@styles/Profile.module.css";
import Image from "next/image";
import profileImage from "@public/profile.png";
import logo from "@public/logo-white.svg";
import { useUser } from "@context/User";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { IoIosBody } from "react-icons/io";

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user && router.isReady) {
      router.push("/login");
    }
  }, [user, router.isReady]);

  console.log(user?.consumer);
  return (
    <main>
      {user && (
        <>
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
          </div>
        </>
      )}
    </main>
  );
}
