import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from '../styles/EscapeRoom.module.css';


// Timer component
export default function Timer({ duration }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const router = useRouter();

  useEffect(() => {
    if (timeLeft <= 0) {
      router.push('/fail');
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, router]);

  const formatTime = t => `${Math.floor(t / 60)}:${('0' + (t % 60)).slice(-2)}`;

  return <div className={styles.timer}>⏳ Time Left: {formatTime(timeLeft)}</div>;
}