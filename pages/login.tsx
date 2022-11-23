import { useUser } from "@context/User";
import { axiosInstance } from "@utils/index";
import Image from "next/image";
import Link from "next/link";
import logo from "@public/logo-white.svg";
import { useRouter } from "next/router";
import styles from "@styles/Login.module.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IFormData } from "types";

export default function LoginPage() {
  // Initial state
  const initialState = {
    email: "",
    password: "",
  };
  // Hooks
  const router = useRouter();
  const { user } = useUser();
  const { setUser } = useUser();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [formData, setFormData] = useState<IFormData>(initialState);

  useEffect(() => {
    if (user && !user?.consumer && router.isReady) {
      router.push("/add-details");
    }
  }, [user, router.isReady]);

  // Destructure data
  const { email, password } = formData;

  // Check for empty fields
  const hasEmpty = Object.values(formData).some((data) => data === "");

  // Handle change
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    // Enable button if no filed is empty
    {
      !hasEmpty && setIsDisabled(false);
    }

    // Update state
    setFormData((currFormData) => ({
      ...currFormData,
      [e.target.name]: e.target.value,
    }));
  }

  // Handle submit
  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();

    // Sign user in
    try {
      // Make request to the backend
      const response = await axiosInstance.post("/users/signin", formData);

      // Update state
      setUser(response.data.data.user);

      // Clear the form
      setFormData(initialState);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <main className={styles.login}>
      <section>
        <div className={styles.logo}>
          <Image src={logo} />
        </div>
        <p className={styles.title}>Sign in</p>

        <form className={styles.form} action="submit">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email Address"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleChange}
          />
        </form>

        <button type="submit" className={styles.button} onClick={handleSubmit}>
          Sign in
        </button>

        <p className={styles.register}>
          Don't have an account?{" "}
          <Link href="/register">
            <a className="">Sign up</a>
          </Link>
        </p>
      </section>
    </main>
  );
}
