import Login from "@components/Login";
import { useUser } from "@context/User";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user?.age) {
      router.push("/complete-profile");
    }
  }, [user]);

  return (
    <main className="bg-dark-blue min-h-screen">
      <Login />
    </main>
  );
}
