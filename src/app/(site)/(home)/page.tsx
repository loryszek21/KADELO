import styles from "./page.module.scss";

function App(): JSX.Element {
    return (
        <div className={styles.container}>
        <div className={styles.content}>
            <div className={styles.logo}>
                <code>&lt;/&gt;</code>
            </div>
            <div className={styles.inspiration}>
            <p>
                "Programming is not just a skill - it is the art of creation. Every line of code
                is a step towards realizing your dreams. Immerse yourself in a world of possibilities,
                where the only limitation is your imagination. Start today and create the future."
            </p>
            </div>
            <div className={styles.motto}>
                <p>"Learn to code, unlock your future"</p>
                <div className={styles.startButtonContainer}>
                    <button className={styles.startButton}>Start today</button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default App;
