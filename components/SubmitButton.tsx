import { ISubmitButtonProps } from "types";
import PulseLoader from "react-spinners/PulseLoader";
import styles from "@styles/SubmitButton.module.css";

export default function SubmitButton({
  text,
  isLoading,
  handleClick,
}: ISubmitButtonProps) {
  return (
    <button
      type="submit"
      onClick={handleClick}
      className={styles.submit_button}
    >
      {isLoading ? <PulseLoader size={12} color="#fff" margin={5} /> : text}
    </button>
  );
}
