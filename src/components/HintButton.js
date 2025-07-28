import { useState } from 'react';

export default function HintButton({ hint }) {
  const [shown, setShown] = useState(false);
  const [clicks, setClicks] = useState(0);

  const revealHint = () => {
    if (clicks < 2) {
      setShown(true);
      setClicks(clicks + 1);
    }
  };

  return (
    <div>
      <button onClick={revealHint} disabled={clicks >= 2}>Hint</button>
      {shown && <p>💡 {hint}</p>}
    </div>
  );
}