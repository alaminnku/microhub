import { useData } from "@context/Data";
import { useUser } from "@context/User";
import styles from "@styles/ProgramLog.module.css";
import { axiosInstance } from "@utils/index";

export default function ProgramLogPage() {
  // Hooks
  const { user } = useUser();
  const { programs } = useData();

  // Assign program
  async function assignProgram(programId: number) {
    // console.log(user?.consumer?.id, programId);

    try {
      const response = await axiosInstance.post("/programs/consumer/self", {
        programId,
      });

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className={styles.program_log}>
      {programs.isLoading && (
        <section>
          <h2>Loading...</h2>
        </section>
      )}

      {!programs.isLoading && programs.data.length === 0 && (
        <section>
          <h2>No programs found</h2>
        </section>
      )}

      {programs.data.length > 0 && (
        <section className={styles.programs}>
          <h2>Your program</h2>

          {programs.data.map((program) => (
            <div className={styles.program} key={program.id}>
              <p>{program.name}</p>
              <button onClick={() => assignProgram(program.id)}>Assign</button>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
