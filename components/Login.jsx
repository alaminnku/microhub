import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "@public/layout/logo.svg";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [disable, setDisable] = useState(true);

  const { email, password } = formData;

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
      email: "",
      password: "",
    }));
  }
  return (
    <section>
      <section className="px-10 py-5 flex flex-col">
        <div className="my-10 text-center">
          <div className="mb-4">
            <Image src={logo} />
          </div>
          <p className="text-2xl text-white">Sign in</p>
        </div>

        <form className="flex flex-col mb-8">
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
        </form>

        <button
          className={`rounded-full text-white self-center w-48 h-12 mb-8 ${
            disable ? "bg-gray-700 text-gray-500" : "bg-light-blue"
          }`}
          onClick={handleSubmit}
        >
          Sign in
        </button>

        <p className="text-white self-center mb-2">
          Don't have an account?{" "}
          <Link href="/register">
            <a className="text-light-blue">Sign up</a>
          </Link>
        </p>
      </section>
    </section>
  );
}
