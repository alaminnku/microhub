import Image from "next/image";
import logo from "@public/logo-black.svg";
import Link from "next/link";
import { IMobileNavProps } from "types";
import styles from "@styles/MobileNav.module.css";

export default function ({ isOpen, setIsOpen }: IMobileNavProps) {
  return (
    <nav className={styles.mobile_nav}>
      <div className={styles.logo} onClick={() => setIsOpen(false)}>
        <Link href="/">
          <a>
            <Image src={logo} alt="Microhub logo" priority />
          </a>
        </Link>
      </div>

      <div
        className={`${styles.hamburger} ${isOpen && styles.open}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
        <div className={styles.line3}></div>
      </div>
    </nav>
  );
}
