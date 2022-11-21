import { useState } from "react";
import styles from "@styles/Header.module.css";
import MobileMenu from "@components/MobileMenu";
import MobileNav from "@components/MobileNav";

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className={styles.header}>
      <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
}
