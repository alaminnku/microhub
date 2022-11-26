import Link from "next/link";
import { IBackButton } from "types";
import { MdKeyboardArrowRight } from "react-icons/md";
import styles from "@styles/BackButton.module.css";

export default function BackButton({ url }: IBackButton) {
  return (
    <Link href={url}>
      <a className={styles.back_button}>
        <MdKeyboardArrowRight /> Back
      </a>
    </Link>
  );
}
