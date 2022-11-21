import Link from "next/link";
import { IFormData } from "types";
import Image from "next/image";
import logo from "@public/logo.svg";
import { axiosInstance } from "@utils/index";
import { ChangeEvent, FormEvent, useState } from "react";

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
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [formData, setFormData] = useState<IFormData>(initialState);

  // Destructure data
  const { first_name, last_name, email, password, passwordConfirm } = formData;

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
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/users/signup/client", formData);

      console.log(res);
    } catch (err) {
      console.log(err);
    }

    setFormData(initialState);
  }

  return (
    <main className="">
      <section className="">
        <div className="">
          <div className="">
            <Image src={logo} />
          </div>
          <p className="">Create an Account</p>
        </div>

        <form action="submit" className="">
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

        <div className="">
          <input type="checkbox" className="" />
          <p className="">By signing up I agree to the Terms & Conditions</p>
        </div>

        <button type="submit" className="" onClick={handleSubmit}>
          Register Now
        </button>

        <p className="">
          Have an account?{" "}
          <Link href="/login">
            <a className="text-light-blue">Sign in</a>
          </Link>
        </p>
      </section>
    </main>
  );
}
