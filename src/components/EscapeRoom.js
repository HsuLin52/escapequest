import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function EscapeRoom({ theme }) {
  const [puzzles, setPuzzles] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [index, setIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const router = useRouter();

  useEffect(() => {
    async function fetchPuzzles() {
      const res = await fetch(`/data/${theme}.json`);
      const data = await res.json();
      setPuzzles(data.puzzles);
    }
    fetchPuzzles();
  }, [theme]);

  useEffect(() => {
    if (timeLeft <= 0) {
      router.push('/fail');
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, router]);

  const formatTime = (t) => `${Math.floor(t / 60)}:${('0' + (t % 60)).slice(-2)}`;

  const handleSubmit = () => {
    const correctAnswer = puzzle.answer.toLowerCase().trim();
    const user = userAnswer.toLowerCase().trim();

    if (user === correctAnswer) {
      let message = '';
      if (theme === 'eldoria') {
        message = '🪄 The magic recognizes your royal blood... the path opens.';
      } else if (theme === 'mirrors') {
        message = '🪞 The mirror ripples… revealing the next truth.';
      } else if (theme === 'sugarvale') {
        message = '🍬 Sweet success! The spell on the oven flickers.';
      }

      setFeedback(message);
      setShowHint(false);
      setUserAnswer('');

      // Move to next puzzle after 2 seconds
      setTimeout(() => {
        setFeedback('');
        if (index + 1 === puzzles.length) {
          router.push('/win');
        } else {
          setIndex(index + 1);
        }
      }, 2000);
    } else {
      // Wrong answer
      let message = "Wrong answer.";
      if (theme === 'eldoria') {
        message = "🏰 The castle spirits whisper: That is not the answer, heir of Eldoria.";
      } else if (theme === 'mirrors') {
        message = "🪞 The mirror flickers… but shows no truth in that response.";
      } else if (theme === 'sugarvale') {
        message = "🧁 The frosting frowns… wrong guess in Sugarvale Hollow!";
      }
      setFeedback(message);
    }
  };

  if (puzzles.length === 0) return <p style={{ padding: '20px' }}>Loading puzzles...</p>;

  const puzzle = puzzles[index];
  const percent = Math.floor(((index + 1) / puzzles.length) * 100);

  return (
    <div className="room-container">
      <div className="room-box">
        <div className="timer">⏳ Time Left: {formatTime(timeLeft)}</div>

        <div className="puzzle-title">{puzzle.title}</div>
        <div className="puzzle-question">{puzzle.question}</div>

        <div className="input-group">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={() => setShowHint(true)}>Hint</button>
        </div>

        {feedback && (
          <p className="feedback-message">{feedback}</p>
        )}

        {showHint && (
          <p className="hint-text">💡 {puzzle.hint}</p>
        )}

        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${percent}%` }}></div>
        </div>
      </div>
    </div>
  );
}