import Link from "next/link";
import Image from "next/image";
import { IFormData } from "types";
import { useUser } from "@context/User";
import { useRouter } from "next/router";
import logo from "@public/logo-white.svg";
import { axiosInstance } from "@utils/index";
import styles from "@styles/Register.module.css";
import SubmitButton from "@components/SubmitButton";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function RegistrationPage() {
  // Initial state
  const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };
  // Hooks
  const router = useRouter();
  const { user, setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<IFormData>(initialState);

  // Check user
  useEffect(() => {
    if (user && router.isReady) {
      router.push("/profile");
    }
  }, [user, router.isReady]);

  // Destructure data
  const { first_name, last_name, email, password, passwordConfirm } = formData;

  // Handle change
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    // Update state
    setFormData((currFormData) => ({
      ...currFormData,
      [e.target.name]: e.target.value,
    }));
  }

  // Handle submit
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Register user
    try {
      setIsLoading(true);

      const res = await axiosInstance.post("/users/signup/client", formData);

      // Update state
      setFormData(initialState);
      setUser(res.data.data.user);

      // Push to add details page
      router.push("/add-details");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className={styles.register}>
      <section>
        <div className={styles.logo}>
          <Image src={logo} priority />
        </div>
        <p className={styles.title}>Create an Account</p>

        <form action="submit" className={styles.form}>
          <input
            className=""
            type="text"
            name="first_name"
            value={first_name}
            placeholder="First Name"
            onChange={handleChange}
          />
          <input
            className=""
            type="text"
            name="last_name"
            value={last_name}
            placeholder="Last Name"
            onChange={handleChange}
          />
          <input
            className=""
            type="email"
            name="email"
            value={email}
            placeholder="Email Address"
            onChange={handleChange}
          />
          <input
            className=""
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleChange}
          />
          <input
            className=""
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            placeholder="Retype Password"
            onChange={handleChange}
          />
        </form>

        <p>By signing up I agree to the Terms & Conditions</p>

        <SubmitButton
          text="Register Now"
          isLoading={isLoading}
          handleClick={handleSubmit}
        />

        <p className={styles.login}>
          Have an account?{" "}
          <Link href="/login">
            <a className="text-light-blue">Sign in</a>
          </Link>
        </p>
      </section>
    </main>
  );
}
