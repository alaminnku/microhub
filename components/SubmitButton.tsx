import { ISubmitButtonProps } from "types";
import ButtonLoader from "./ButtonLoader";
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
      {isLoading ? <ButtonLoader /> : text}
    </button>
  );
}
