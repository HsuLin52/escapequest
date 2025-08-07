import Link from 'next/link';

import styles from '../styles/EndScreen.module.css';

// Component of the page after failing to escape
export default function FailPage() {
  return (
    <div className={styles.endScreen}>
      <div className={styles.fancyBox}>
        <h1 className={styles.endTitle}>Time&lsquo;s Up!</h1>
        <p className={styles.endText}>You were so close… but the clock has claimed its victory.</p>
        <p className={styles.endFlair}>The puzzles remain unsolved... for now.</p>
        <Link href="/" className={styles.endButton}>Try Again</Link>
      </div>
    </div>
  );
}