import { useUser } from "@context/User";
import { axiosInstance } from "@utils/index";
import Image from "next/image";
import Link from "next/link";
import logo from "@public/logo-white.svg";
import { useRouter } from "next/router";
import styles from "@styles/Login.module.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IFormData } from "types";

import SubmitButton from "@components/SubmitButton";

export default function LoginPage() {
  // Initial state
  const initialState = {
    email: "",
    password: "",
  };
  // Hooks
  const router = useRouter();
  const { isUserLoading, user } = useUser();
  const { setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<IFormData>(initialState);

  // Check user
  useEffect(() => {
    if (user && router.isReady) {
      router.push("/");
    }
  }, [user, router.isReady]);

  // Destructure data
  const { email, password } = formData;

  // Handle change
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
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
      setIsLoading(true);

      // Make request to the backend
      const response = await axiosInstance.post("/users/signin", formData);

      // Update state
      setUser(response.data.data.user);

      router.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      setFormData(initialState);
    }
  }
  return (
    <main className={styles.login}>
      {isUserLoading && <h2>Loading....</h2>}

      {!isUserLoading && !user && (
        <>
          <section>
            <div className={styles.logo}>
              <Image src={logo} />
            </div>
            <p className={styles.title}>Sign in</p>

            <form className={styles.form}>
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

            <SubmitButton
              text="Sign in"
              isLoading={isLoading}
              handleClick={handleSubmit}
            />

            <p className={styles.register}>
              Don't have an account?{" "}
              <Link href="/register">
                <a className="">Sign up</a>
              </Link>
            </p>
          </section>
        </>
      )}
    </main>
  );
}
