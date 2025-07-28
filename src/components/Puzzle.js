import { useState } from 'react';

export default function Puzzle({ puzzle, onSubmit }) {
  const [userAnswer, setUserAnswer] = useState('');

  const handleSubmit = () => {
    onSubmit(userAnswer);
    setUserAnswer('');
  };

  return (
    <div>
      <p><strong>{puzzle.question}</strong></p>
      <input
        type="text"
        value={userAnswer}
        onChange={e => setUserAnswer(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}