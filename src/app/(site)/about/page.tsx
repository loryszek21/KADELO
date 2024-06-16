import styles from "./page.module.scss";
import { FaCode } from "react-icons/fa";

export const metadata: any = {
    title: "About page",
}

function About(): JSX.Element {

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <FaCode size={100} />
            </div>
            <h1 className={styles.title}>KADELO </h1>
            <hr className={styles.hr} />
                <div className={styles.section}>
                    <h2>About our project</h2>
                    <p>
                        Our project is an educational application designed to help students and programming enthusiasts learn the Java programming language. 
                        This application provides a comprehensive learning experience through interactive lessons, coding challenges, and practical projects.
                    </p>
                    <p>
                        Created as part of a university course, our goal is to provide an engaging and effective learning platform for those who wish to improve their coding skills. 
                        Whether you are a beginner just starting out or an advanced learner looking to refine your knowledge, 
                        our application offers valuable resources tailored to your needs.
                    </p>
                    <p>
                        By using our application, users can work through a structured curriculum that covers fundamental concepts, 
                        advanced topics, and real-world applications of Java. 
                        We aim to foster a community of learners who can support each other and grow together as they advance through the stages of their programming journey.
                    </p>
                </div>
                <hr className={styles.hr} />
                <div className={styles.section}>
                    <h2>Developers</h2>
                <p>
                    Oleksandr Demenkov - Main Frontend developer
                </p>
                <p>
                    Dawid Lorych - Main Backend developer
                </p>
                <p>
                    Damian Kaczmarek - Assistant Frontend developer
                </p>
                </div>
        </div>
    )
}

export default About;

