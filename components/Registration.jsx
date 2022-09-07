import Image from "next/image";
import Link from "next/link";
import logo from "@public/layout/logo.svg";
import { useState } from "react";

export default function Registration() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    retypePassword: "",
  });
  const [disable, setDisable] = useState(true);

  const { firstName, lastName, email, password, retypePassword } = formData;

  const hasEmpty = Object.values(formData).some((data) => data === "");

  function handleChange(e) {
    {
      !hasEmpty && setDisable(false);
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log(formData);

    setFormData((prevFormData) => ({
      ...prevFormData,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      retypePassword: "",
    }));
  }

  return (
    <section className="px-10 py-5 flex flex-col">
      <div className="my-10 text-center">
        <div className="mb-4">
          <Image src={logo} />
        </div>
        <p className="text-2xl text-white">Create an Account</p>
      </div>

      <form className="flex flex-col mb-2">
        <input
          className="rounded-full mb-3 px-3 py-2 placeholder:text-sm"
          type="text"
          name="firstName"
          value={firstName}
          placeholder="First Name"
          onChange={handleChange}
        />
        <input
          className="rounded-full mb-3 px-3 py-2 placeholder:text-sm"
          type="text"
          name="lastName"
          value={lastName}
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
          name="retypePassword"
          value={retypePassword}
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
        className={`rounded-full text-white self-center w-48 h-12 mb-8 ${
          disable ? "bg-gray-700 text-gray-500" : "bg-light-blue"
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
