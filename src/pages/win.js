import Link from 'next/link';

// Component of the page after escaping
export default function WinPage() {
  return (
    <div className="end-screen success">
      <div className="end-box">
        <h1>You Escaped!</h1>
        <p>Congratulations, you solved all the puzzles and broke free!</p>
        <p className="flair">✨ Victory belongs to the clever!</p>
        <Link href="/" className="play-again">Play Again</Link>
      </div>
    </div>
  );
}