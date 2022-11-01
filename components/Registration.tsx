import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { IFormData } from "types";
import logo from "@public/logo.svg";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Registration() {
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
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/signup/client`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res);
    } catch (err) {
      console.log(err);
    }

    setFormData(initialState);
  }

  return (
    <section className="px-10 py-5 flex flex-col">
      <div className="my-10 text-center">
        <div className="mb-4">
          <Image src={logo} />
        </div>
        <p className="text-2xl text-white">Create an Account</p>
      </div>

      <form action="submit" className="flex flex-col mb-2">
        <input
          className="rounded-full mb-3 px-3 py-2 placeholder:text-sm"
          type="text"
          name="first_name"
          value={first_name}
          placeholder="First Name"
          onChange={handleChange}
        />
        <input
          className="rounded-full mb-3 px-3 py-2 placeholder:text-sm"
          type="text"
          name="last_name"
          value={last_name}
          placeholder="Last Name"
          onChange={handleChange}
        />
        <input
          className="rounded-full mb-3 px-3 py-2 placeholder:text-sm"
          type="email"
          name="email"
          value={email}
          placeholder="Email Address"
          onChange={handleChange}
        />
        <input
          className="rounded-full mb-3 px-3 py-2 placeholder:text-sm"
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          className="rounded-full mb-3 px-3 py-2 placeholder:text-sm"
          type="password"
          name="passwordConfirm"
          value={passwordConfirm}
          placeholder="Retype Password"
          onChange={handleChange}
        />
      </form>

      <div className="flex items-start mb-8">
        <input type="checkbox" className="mr-2 mt-1 w-5 h-5" />
        <p className="text-white">
          By signing up I agree to the Terms & Conditions
        </p>
      </div>

      <button
        type="submit"
        className={`rounded-full text-white self-center w-48 h-12 mb-8 ${
          isDisabled ? "bg-gray-700 text-gray-500" : "bg-light-blue"
        }`}
        onClick={handleSubmit}
      >
        Register Now
      </button>

      <p className="text-white self-center mb-2">
        Have an account?{" "}
        <Link href="/login">
          <a className="text-light-blue">Sign in</a>
        </Link>
      </p>
    </section>
  );
}
