import Link from "next/link";
import { IBackButton } from "types";
import styles from "@styles/BackButton.module.css";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function BackButton({ url }: IBackButton) {
  return (
    <Link href={url}>
      <a className={styles.back_button}>
        <MdKeyboardArrowRight /> Back
      </a>
    </Link>
  );
}
