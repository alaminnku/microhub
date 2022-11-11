import { useUser } from "@context/User";
import { useRouter } from "next/router";
import { axiosInstance } from "@utils/index";
import { ChangeEvent, useEffect, useState } from "react";
import SubmitButton from "@components/layout/SubmitButton";

export default function CompleteProfilePage() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [age, setAge] = useState<number>();
  const [photo, setPhoto] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);

  // Check user details and push to the details page
  useEffect(() => {
    if (!user?.consumer) {
      router.push("/add-details");
    }
  });

  function handleChangeFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setPhoto(e.target.files[0]);
    }
  }

  async function handleSubmit(): Promise<void> {
    try {
      // Show loader
      setIsLoading(true);

      // Make request to the backend
      const response = await axiosInstance.post("/user/update", { age, photo });

      console.log(response);

      // Update user
      setUser(response.data.data.user);
    } catch (err) {
      console.log(err);
    } finally {
      // Remove loader
      setIsLoading(false);
    }
  }

  return (
    <main className="px-5 py-4">
      <h2 className="mb-3 text-xl font-bold">Complete your profile</h2>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="age" className="mb-3">
          Add your age
        </label>
        <input
          type="number"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAge(+e.target.value)
          }
          id="age"
          className="px-2 py-2 border border-gray-500 rounded mb-6"
        />

        <input
          type="file"
          id="file"
          onChange={handleChangeFile}
          className="mb-6"
        />

        <SubmitButton />
      </form>
    </main>
  );
}
