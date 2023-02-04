import { useAlert } from "@context/Alert";
import { useUser } from "@context/User";
import styles from "@styles/Notifications.module.css";
import { axiosInstance, showErrorAlert } from "@utils/index";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IAxiosError, IUser } from "types";

export default function NotificationsPage() {
  const router = useRouter();
  const { setAlerts } = useAlert();
  const { user, setUser, isUserLoading } = useUser();

  // Check user
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login");
    }
  }, [isUserLoading, user]);

  // Handle nutritionist invitation
  async function handleInvite(status: number) {
    if (!user?.questionnaire) {
      // Push to the questionnaire page
      router.push("/questionnaire");
    } else {
      try {
        // Make request to the backend
        await axiosInstance.post("/consumers/trainer/accept", {
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

        // Show alert
        showErrorAlert(err as AxiosError<IAxiosError>, setAlerts);
      }
    }
  }
  return (
    <main className={styles.notifications}>
      <h2>Notifications</h2>

      {!isUserLoading && user && user.requested_nutritionists.length > 0 && (
        <section className={styles.notification}>
          <p>
            You've got an invite from{" "}
            {user.requested_nutritionists[0].first_name}{" "}
            {user.requested_nutritionists[0].last_name}
          </p>
          <div className={styles.buttons}>
            <button onClick={() => handleInvite(1)}>Confirm</button>
            <button onClick={() => handleInvite(-1)}>Reject</button>
          </div>
        </section>
      )}
    </main>
  );
}
