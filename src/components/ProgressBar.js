// Progress bar component
export default function ProgressBar({ current, total }) {
  // Calculate the percentage completed
  const percent = Math.floor((current / total) * 100);

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${percent}%` }}></div>
    </div>
  );
}