import { useState, useEffect } from 'react';

import styles from '../styles/EscapeRoom.module.css';
import { playEffect } from '../services/effectService';

// Puzzle component that receives a puzzle object and a submit handler function
export default function Puzzle({ puzzle, onSubmit }) {
  const [userAnswer, setUserAnswer] = useState(''); // State to store the user's answer
  const [shown, setShown] = useState(false); // State to determine if the hint is currently shown
  const [clicks, setClicks] = useState(0); // State to count how many times the hint button has been clicked

  // URLs for sound effects
  const correctSound = 'https://freesound.org/data/previews/66/66717_931655-lq.mp3'; // Correct Answer
  const wrongSound   = 'https://freesound.org/data/previews/331/331912_3248244-lq.mp3'; // Wrong Answer

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

  // Function to check answer and play corresponding sound
  const handleSubmit = () => {
    const isCorrect = userAnswer.trim().toLowerCase() === puzzle.answer.toLowerCase(); // Checks whether the user's answer is correct
    playEffect(isCorrect ? correctSound : wrongSound); // Plays correct sound or wrong sound
    onSubmit(userAnswer); // Sends the user's answer to the parent component
    setUserAnswer(''); // Clears the input field
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