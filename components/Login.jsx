import Image from "next/image";
import Link from "next/link";
import logo from "@public/layout/logo.svg";

export default function Login() {
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
            placeholder="Email Address"
          />
          <input
            className="rounded-full mb-3 px-3 py-2 placeholder:text-sm"
            type="password"
            placeholder="Password"
          />
        </form>

        <button className="rounded-full bg-light-blue text-white self-center w-48 h-12 mb-8">
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
