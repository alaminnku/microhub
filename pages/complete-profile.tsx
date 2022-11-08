import SubmitButton from "@components/layout/SubmitButton";
import { useUser } from "@context/User";
import { axiosInstance } from "@utils/index";
import { ChangeEvent, useState } from "react";
import { IFormData } from "types";

export default function CompleteProfilePage() {
  const { setUser } = useUser();
  const [age, setAge] = useState<number>();
  const [photo, setPhoto] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);

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
    <main className="px-5 py-4 border">
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
