// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import Timer from '../components/Timer';
// import Puzzle from '../components/Puzzle';
// import HintButton from '../components/HintButton';
// import ProgressBar from '../components/ProgressBar';

// export default function EscapeRoom({ theme }) {
  // const [puzzles, setPuzzles] = useState([]); // Stores puzzle data
  // const [feedback, setFeedback] = useState(''); // Message after user answers
  // const [index, setIndex] = useState(0); // Current puzzle index
  // const [userAnswer, setUserAnswer] = useState(''); // User's current answer
  // const [showHint, setShowHint] = useState(false); // Show/hide hint
  // const [timeLeft, setTimeLeft] = useState(600); // Timer in seconds
  // const [hintClicks, setHintClicks] = useState(0); // Number of click tracking state
  // const router = useRouter();

//   // Fetching Puzzle Data When Theme Changes
//   useEffect(() => {
//     async function fetchPuzzles() {
//       const res = await fetch(`/data/${theme}.json`);
//       const data = await res.json();
//       setPuzzles(data.puzzles); // Save puzzles to state
//     }
//     fetchPuzzles();
//   }, [theme]);

//   // Timer
//   useEffect(() => {
//     if (timeLeft <= 0) {
//       router.push('/fail'); // Go to failed page if timer hits 0
//       return;
//     }
//     const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
//     return () => clearInterval(timer); // Cleaning up
//   }, [timeLeft, router]);

//   const formatTime = (t) => `${Math.floor(t / 60)}:${('0' + (t % 60)).slice(-2)}`; // Formatting Time Display

//   // Handling user's answer
//   const handleSubmit = () => {
//     const correctAnswer = puzzle.answer.toLowerCase().trim();
//     const user = userAnswer.toLowerCase().trim();

//     // If the user's answer is correct,
//     if (user === correctAnswer) {
//       let message = '';
//       // displaying a message according to the theme
//       if (theme === 'eldoria') {  
//         message = '🪄 The magic recognizes your royal blood... the path opens.';
//       } else if (theme === 'mirrors') {
//         message = '🪞 The mirror ripples… revealing the next truth.';
//       } else if (theme === 'sugarvale') {
//         message = '🍬 Sweet success! The spell on the oven flickers.';
//       }

//       setFeedback(message);
//       setShowHint(false);
//       setUserAnswer('');

//       // Moving to next puzzle after 2 seconds or win page
//       setTimeout(() => {
//         setFeedback('');
//         if (index + 1 === puzzles.length) {
//           router.push('/win');
//         } else {
//           setIndex(index + 1);
//         }
//       }, 2000);
//     } else { // If the user's answer is wrong,
//       let message = "Wrong answer.";
//       // displaying a message according to the theme
//       if (theme === 'eldoria') {
//         message = "🏰 The castle spirits whisper: That is not the answer, heir of Eldoria.";
//       } else if (theme === 'mirrors') {
//         message = "🪞 The mirror flickers… but shows no truth in that response.";
//       } else if (theme === 'sugarvale') {
//         message = "🧁 The frosting frowns… wrong guess in Sugarvale Hollow!";
//       }
//       setFeedback(message);
//     }
//   };

//   // Loading State Before Puzzles Appear
//   if (puzzles.length === 0) return <p style={{ padding: '20px' }}>Loading puzzles...</p>;

//   // Current Puzzle & Progress Bar
//   const puzzle = puzzles[index];
//   const percent = Math.floor(((index + 1) / puzzles.length) * 100);

//   // Page layout
//   return (
//     <div className="room-container">
//       <div className="room-box">
//         <div className="timer">⏳ Time Left: {formatTime(timeLeft)}</div>

//         <div className="puzzle-title">{puzzle.title}</div>
//         <div className="puzzle-question">{puzzle.question}</div>

//         <div className="input-group">
//           <input
//             type="text"
//             value={userAnswer}
//             onChange={(e) => setUserAnswer(e.target.value)}
//           />
//           <button onClick={handleSubmit}>Submit</button>
//           <button 
//             onClick={() => {
//               if (hintClicks < 2) {
//                 setShowHint(true);
//                 setHintClicks(hintClicks + 1);
//               }
//             }} 
//             disabled={hintClicks >= 2}
//           >
//             Hint
//           </button>
//         </div>

//         {feedback && (
//           <p className="feedback-message">{feedback}</p>
//         )}

//         {showHint && (
//           <p className="hint-text">💡 {puzzle.hint}</p>
//         )}

//         <div className="progress-container">
//           <div className="progress-bar" style={{ width: `${percent}%` }}></div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Timer from '../components/Timer';
import Puzzle from '../components/Puzzle';
import ProgressBar from '../components/ProgressBar';

export default function EscapeRoom({ theme }) {
  const [puzzles, setPuzzles] = useState([]); // Stores puzzle data
  const [index, setIndex] = useState(0); // Current puzzle index
  const [feedback, setFeedback] = useState(''); // Message after user answers
  const router = useRouter();

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
        message = '🗡️ The magic recognizes your royal blood... the path opens.';
      } else if (theme === 'mirrors') {
        message = '🪞 The mirror ripples… revealing the next truth.';
      } else if (theme === 'sugarvale') {
        message = '🧁 Sweet success! The spell on the oven flickers.';
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
        wrong = '🏰 The castle spirits whisper: That is not the answer, heir of Eldoria.';
      } else if (theme === 'mirrors') {
        wrong = '🪞 The mirror flickers… but shows no truth in that response.';
      } else if (theme === 'sugarvale') {
        wrong = '🧁 The frosting frowns… wrong guess in Sugarvale Hollow!';
      }
      setFeedback(wrong);
    }
  };

  // Page Layout
  return (
    <div className="room-container">
      <div className="room-box">
        <Timer duration={600} />

        <div className="puzzle-title">{puzzle.title}</div>
        <div className="puzzle-question">{puzzle.question}</div>

        <Puzzle puzzle={puzzle} onSubmit={handleAnswer} />

        {feedback && (
          <p className="feedback-message">{feedback}</p>
        )}

        <ProgressBar current={current} total={total} />
      </div>
    </div>
  );
}