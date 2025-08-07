import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

// Home Page component
export default function Home() {
  const router = useRouter(); // Initializing router for navigation

  // Function to handle theme selection and navigate to room page
  const handleSelect = (theme) => {
    router.push(`/room?theme=${theme}`);
  };

  // Page layout
  return (
    <>
      <Head>
        <title>EscapeQuest</title>
      </Head>
      <div className={styles.homeContainer}>
        <h1 className={styles.homeTitle}>EscapeQuest</h1>
        <p className={styles.welcomeMessage}>
          Welcome, Detective! Choose your theme and begin your quest to escape before time runs out.
        </p>
        {/* Button group to select different escape room themes */}
        <div className={styles.buttonGroup}>
          <button className={styles.themeButton} onClick={() => handleSelect('eldoria')}>Eldoria</button>
          <button className={styles.themeButton} onClick={() => handleSelect('mirrors')}>Mirrors</button>
          <button className={styles.themeButton} onClick={() => handleSelect('sugarvale')}>Sugarvale</button>
        </div>
      </div>
    </>
  );
}