import { useUser } from "@context/User";
import { useRouter } from "next/router";
import { axiosInstance } from "@utils/index";
import { ChangeEvent, useEffect, useState } from "react";
import SubmitButton from "@components/SubmitButton";

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
    <main className="">
      <h2 className="">Complete your profile</h2>

      <form onSubmit={handleSubmit} className="">
        <label htmlFor="age" className="">
          Add your age
        </label>
        <input
          type="number"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAge(+e.target.value)
          }
          id="age"
          className=""
        />

        <input type="file" id="file" onChange={handleChangeFile} className="" />

        <SubmitButton />
      </form>
    </main>
  );
}
