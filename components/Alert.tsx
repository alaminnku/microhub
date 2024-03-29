import { IAlertProps } from "types";
import { MdErrorOutline } from "react-icons/md";
import styles from "@styles/Alert.module.css";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function Alert({ alerts }: IAlertProps) {
  return (
    <>
      {alerts.length > 0 && (
        <div className={styles.alerts}>
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`${styles.alert} ${
                alert.type === "success" && styles.success
              } ${alert.type === "failed" && styles.failed}`}
            >
              <p>
                {alert.type === "success" ? (
                  <IoMdCheckmarkCircleOutline className={styles.icon} />
                ) : (
                  <MdErrorOutline className={styles.icon} />
                )}
                {alert.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
