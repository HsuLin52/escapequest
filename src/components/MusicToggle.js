import { useRef, useState } from 'react';
import { fetchBackgroundTracks, playBackground } from '../services/musicService';
import styles from '../styles/MusicToggle.module.css';

// MusicToggle component that allows toggling background music based on theme
export default function MusicToggle({ theme }) {
  const audioRef = useRef(null); // Ref for the <audio> element to control playback
  const [playing, setPlaying] = useState(false); // Tracks whether music is playing

  // Function to handle music play/pause on button click
  const handlePlay = async () => {
    // If music is not playing, start it
    if (!playing) {
      const audioUrl = await fetchBackgroundTracks(theme); // Fetches the audio URL for current theme
      if (audioUrl) {
        playBackground(audioUrl, audioRef); // Plays the fetched music using audioRef
        setPlaying(true); // Updates state to reflect that music is playing
      }
    } else { // If music is already playing, stop it
      audioRef.current.pause(); // Pauses the music
      setPlaying(false); // Updates state to reflect that music is stopped
    }
  };

  return (
    <div className={styles.musicToggle}>
      {/* Music toggle button that switches text based on playing state */}
      <button className={styles.musicButton} onClick={handlePlay}>
        {playing ? '⏸ Pause Music' : '▶ Play Music'}
      </button>
      <audio ref={audioRef} loop /> {/* Hidden audio element used to play/pause music */}
    </div>
  );
}