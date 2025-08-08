import styles from '../styles/About.module.css';

// About Page component
export default function AboutPage() {
    return (
        <main className={styles.wrapper}>
            <div className={styles.card}>
                <h1 className={styles.title}>About EscapeQuest</h1>
                <p className={styles.subtitle}>
                EscapeQuest is your immersive journey into puzzle-solving adventure.
                </p>

                <section>
                    <h2 className={styles.sectionTitle}>Our Mission</h2>
                    <p>
                        We blend logic, story and make challenges using escape room-style puzzles.
                    </p>
                </section>

                <section>
                    <h2 className={styles.sectionTitle}>What We Offer</h2>
                    <ul>
                        <li>Interactive puzzles in themed environments</li>
                        <li>Time-based challenges</li>
                        <li>Story-driven gameplay</li>
                    </ul>
                </section>

                <section>
                    <h2 className={styles.sectionTitle}>Why Choose EscapeQuest?</h2>
                    <p>
                        Every quest is unique, cinematic and reactive designed to challenge both your mind and imagination.
                    </p>
                </section>
            </div>
        </main>
    );
}