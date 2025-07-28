import Link from 'next/link';

// Component of the page after failing to escape
export default function FailPage() {
  return (
    <div className="end-screen fail">
      <div className="end-box">
        <h1>You Were Trapped!</h1>
        <p>Time ran out, and the final puzzle remains unsolved...</p>
        <p className="flair">🕰️ Perhaps you&lsquo;ll escape next time.</p>
        <Link href="/" className="play-again">Try Again</Link>
      </div>
    </div>
  );
}