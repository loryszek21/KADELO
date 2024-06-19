import Link from "next/link";
import styles from "./page.module.scss";
import { FaCode } from "react-icons/fa";

async function App() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.logo}>
                        <Link href={"/about"}>
                            <FaCode size={300} />
                        </Link>
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
                            <Link href={"/contests"}>
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
