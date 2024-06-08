import Link from "next/link";
import styles from "./page.module.scss";
import { FaCode } from "react-icons/fa";

async function App() {
    const data: CoursePageProps[] = await fetch(
        "http://localhost:5000/courses?limit=3",
        {
            cache: "no-cache",
        }
    )
        .then((res) => res.json())
        .catch((error) => {
            console.error("Error:", error);
        });

    console.log(data);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.logo}>
                        <FaCode size={300} />
                    </div>
                    <div className={styles.inspiration}>
                        <p>
                            &quot;Programming is not just a skill - it is the
                            art of creation. Every line of code is a step
                            towards realizing your dreams. Immerse yourself in a
                            world of possibilities, where the only limitation is
                            your imagination. Start today and create the
                            future.&quot;
                        </p>
                    </div>
                    <div className={styles.motto}>
                        <p>&quot;Learn to code, unlock your future&quot;</p>
                        <div className={styles.startButtonContainer}>
                            <Link href={'/contests'}>
                            <button className={styles.startButton}>
                                Start today
                            </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
