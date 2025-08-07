import { useState, useEffect } from 'react';

import styles from '../styles/EscapeRoom.module.css';

// Puzzle component that receives a puzzle object and a submit handler function
export default function Puzzle({ puzzle, onSubmit }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [shown, setShown] = useState(false); // Controls whether the hint should be displayed
  const [clicks, setClicks] = useState(0); // Tracks how many times the hint button has been clicked

  // Reset everything when puzzle changes
  useEffect(() => {
    setUserAnswer('');
    setShown(false);
  }, [puzzle]);

  // Function to reveal the hint
  const revealHint = () => {
    if (clicks < 2) { // Limiting hint reveal to only twice
      setShown(true); // Showing the hint
      setClicks(prev => prev + 1); // Incrementing click count
    }
  };

  // Function to handle after user's submission
  const handleSubmit = () => {
    onSubmit(userAnswer);
    setUserAnswer('');
  };

  return (
    <>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>

        {/* Hint button, disabled after 2 clicks */}
        <button onClick={revealHint} disabled={clicks >= 2}>Hint</button>
      </div>

      {shown && (
        <p className={styles.hintText}>💡 <em>{puzzle.hint}</em></p>
      )}
    </>
  );
}