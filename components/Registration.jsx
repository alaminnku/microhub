import Image from "next/image";
import Link from "next/link";
import logo from "@public/layout/logo.svg";

export default function Registration() {
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
          placeholder="First Name"
        />
        <input
          className="rounded-full mb-3 px-3 py-2 placeholder:text-sm"
          type="text"
          placeholder="Last Name"
        />
        <input
          className="rounded-full mb-3 px-3 py-2 placeholder:text-sm"
          type="email"
          placeholder="Email Address"
        />
        <input
          className="rounded-full mb-3 px-3 py-2 placeholder:text-sm"
          type="password"
          placeholder="Password"
        />
        <input
          className="rounded-full mb-3 px-3 py-2 placeholder:text-sm"
          type="password"
          placeholder="Retype Password"
        />
      </form>

      <div className="flex items-start mb-8">
        <input type="checkbox" className="mr-2 mt-1 w-5 h-5" />
        <p className="text-white">
          By signing up I agree to the Terms & Conditions
        </p>
      </div>

      <button className="rounded-full bg-light-blue text-white self-center w-48 h-12 mb-8">
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
