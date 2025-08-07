import styles from '../styles/EscapeRoom.module.css';

// Progress bar component
export default function ProgressBar({ current, total }) {
  // Calculates the percentage completed
  const percent = Math.floor((current / total) * 100);

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar} style={{ width: `${percent}%` }}></div>
    </div>
  );
}