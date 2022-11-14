import { useUser } from "@context/User";
import { axiosInstance } from "@utils/index";
import Image from "next/image";
import Link from "next/link";
import logo from "@public/logo.svg";
import { useRouter } from "next/router";
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
    if (!user?.consumer) {
      router.push("/complete-profile");
    }
  }, [user]);

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
    <section className="px-10 py-5 flex flex-col">
      <div className="my-10 text-center">
        <div className="mb-4">
          <Image src={logo} />
        </div>
        <p className="text-2xl text-white">Sign in</p>
      </div>

      <form className="flex flex-col mb-8" action="submit">
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
        type="submit"
        className={`rounded-full text-white self-center w-48 h-12 mb-8 ${
          isDisabled ? "bg-gray-700 text-gray-500" : "bg-light-blue"
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
  );
}
