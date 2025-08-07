import Link from 'next/link';

import styles from '../styles/EndScreen.module.css';

// Component of the page after escaping
export default function WinPage() {
  return (
    <div className={styles.endScreen}>
      <div className={styles.fancyBox}>
        <h1 className={styles.endTitle}>You Escaped!</h1>
        <p className={styles.endText}>Congratulations, you cracked every clue and escaped in time.</p>
        <p className={styles.endFlair}>✨ Victory belongs to the clever! ✨</p>
        <Link href="/" className={styles.endButton}>Play Again</Link>
      </div>
    </div>
  );
}