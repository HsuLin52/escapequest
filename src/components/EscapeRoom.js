import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import Timer from '../components/Timer';
import Puzzle from '../components/Puzzle';
import ProgressBar from '../components/ProgressBar';
import MusicToggle from '../components/MusicToggle';
import styles from '../styles/EscapeRoom.module.css';

export default function EscapeRoom({ theme }) {
  const [puzzles, setPuzzles] = useState([]); // Stores puzzle data
  const [index, setIndex] = useState(0); // Current puzzle index
  const [feedback, setFeedback] = useState(''); // Message after user answers
  const router = useRouter();

  const formattedTheme = theme.charAt(0).toUpperCase() + theme.slice(1); // Theme to display in the page title

  // Fetching Puzzle Data When Theme Changes
  useEffect(() => {
    async function fetchPuzzles() {
      const res = await fetch(`/data/${theme}.json`);
      const data = await res.json();
      setPuzzles(data.puzzles); // Save puzzles to state
    }
    fetchPuzzles();
  }, [theme]);

  // If puzzles haven't loaded yet
  if (puzzles.length === 0) return <p style={{ padding: '20px' }}>Loading puzzles...</p>;

  const puzzle = puzzles[index];
  const total = puzzles.length;
  const current = index + 1;

  // Handling user's answer
  const handleAnswer = (userAnswer) => {
    const correct = puzzle.answer.toLowerCase().trim();
    const user = userAnswer.toLowerCase().trim();

    // If the user's answer is correct,
    if (user === correct) {
      let message = '';
      // displays a succeeded message according to the theme
      if (theme === 'eldoria') {
        message = 'The magic recognizes your royal blood... the path opens.';
      } else if (theme === 'mirrors') {
        message = 'The mirror ripples… revealing the next truth.';
      } else if (theme === 'sugarvale') {
        message = 'Sweet success! The spell on the oven flickers.';
      }
      setFeedback(message);

      setTimeout(() => {
        setFeedback('');
        if (current === total) {
          router.push('/win');
        } else {
          setIndex(index + 1);
        }
      }, 2000);
    } else { // If the user's answer is wrong,
      // displays a failed message according to the theme
      let wrong = '';
      if (theme === 'eldoria') {
        wrong = 'The castle spirits whisper: That is not the answer, heir of Eldoria.';
      } else if (theme === 'mirrors') {
        wrong = 'The mirror flickers… but shows no truth in that response.';
      } else if (theme === 'sugarvale') {
        wrong = 'The frosting frowns… wrong guess in Sugarvale Hollow!';
      }
      setFeedback(wrong);
    }
  };

  // Page Layout
  return (
    <>
      <Head>
          <title>EscapeQuest | {formattedTheme} Room</title>
        </Head>

      <div className={styles.roomContainer}>
        {/* <MusicToggle theme={theme} /> */}
        <div className={styles.roomBox}>
          <Timer duration={600} />

          <div className={styles.puzzleTitle}>{puzzle.title}</div>
          <div className={styles.puzzleQuestion}>{puzzle.question}</div>

          <Puzzle puzzle={puzzle} onSubmit={handleAnswer} />

          {feedback && (
            <p className={styles.feedbackMessage}>{feedback}</p>
          )}

          <ProgressBar current={current} total={total} />
        </div>
      </div>
    </>
  );
}