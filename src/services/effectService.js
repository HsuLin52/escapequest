import { Howl } from 'howler';

// Function to play a sound effect for correct/wrong answers
export function playEffect(audioUrl) {
  console.log('▶️ [playEffect] Playing effect:', audioUrl); // Log which sound is being played for debugging

  // Create a new Howl instance with sound settings and play it
  return new Howl({
    src: [audioUrl],
    html5: true,
    volume: 0.6,
  }).play(); // Automatically start playing
}