import Link from "next/link";
import { useEffect } from "react";
import { MdLogout } from "react-icons/md";
import { useUser } from "@context/User";
import { IMobileMenuProps } from "types";
import { FaUserAlt } from "react-icons/fa";
import styles from "@styles/MobileMenu.module.css";
import { IoIosNotifications } from "react-icons/io";
import { IoCalendarSharp } from "react-icons/io5";
import { currentYear, axiosInstance } from "@utils/index";
import { AiFillMessage } from "react-icons/ai";
import { GiMeal } from "react-icons/gi";
import { HiDocumentReport, HiOutlineDocumentReport } from "react-icons/hi";

export default function MobileMenu({ isOpen, setIsOpen }: IMobileMenuProps) {
  // Hooks
  const { user, setUser } = useUser();

  // Close mobile menu
  const closeMobileMenu = () => setIsOpen(false);

  // Disable body scroll if MobileMenu is open
  useEffect(() => {
    const body = document.querySelector("body");

    isOpen
      ? (body!.style.overflow = "hidden")
      : (body!.style.overflow = "auto");
  });

  // Logout user
  async function handleSignOut() {
    // Sign a user out
    try {
      // Make request to backend
      await axiosInstance.get(`/users/logout`);

      // Update user
      setUser(null);

      // Close the menu
      setIsOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={`${styles.mobile_menu} ${isOpen && styles.open}`}>
      <ul className={styles.nav_items}>
        <li onClick={closeMobileMenu} className={user ? styles.hide : ""}>
          <Link href="/register">
            <a>
              <FaUserAlt /> Create account
            </a>
          </Link>
        </li>

        <li onClick={closeMobileMenu} className={!user ? styles.hide : ""}>
          <Link href="/profile">
            <a>
              <FaUserAlt /> Profile
            </a>
          </Link>
        </li>

        <li onClick={closeMobileMenu} className={!user ? styles.hide : ""}>
          <Link href="/notifications">
            <a>
              <IoIosNotifications /> Notifications
            </a>
          </Link>
        </li>

        <li onClick={closeMobileMenu} className={!user ? styles.hide : ""}>
          <Link href="/messages">
            <a>
              <AiFillMessage /> Messages
            </a>
          </Link>
        </li>

        <li onClick={closeMobileMenu} className={!user ? styles.hide : ""}>
          <Link href="/program-log">
            <a>
              <HiDocumentReport /> Program log
            </a>
          </Link>
        </li>

        <li onClick={closeMobileMenu} className={!user ? styles.hide : ""}>
          <Link href="/create-meal-plans">
            <a>
              <IoCalendarSharp /> Create plans
            </a>
          </Link>
        </li>

        <li onClick={closeMobileMenu} className={!user ? styles.hide : ""}>
          <Link href="/pre-built-recipes">
            <a>
              <GiMeal /> Pre-built recipes
            </a>
          </Link>
        </li>

        <li onClick={handleSignOut} className={!user ? styles.hide : ""}>
          <span>
            <MdLogout /> Sign out
          </span>
        </li>
      </ul>

      <p className={styles.copyright}>
        Copyright &copy; {currentYear} MicroHub. <br /> All rights reserved
      </p>
    </div>
  );
}
