// Function to fetch background music based on theme using the Jamendo API
export async function fetchBackgroundTracks(theme) {
  const clientId = process.env.NEXT_PUBLIC_JAMENDO_CLIENT_ID; // Gets the Jamendo client ID from the environment variable

  // Maps theme to a suitable Jamendo tag
  const tagMap = {
    eldoria: 'castle',
    mirrors: 'mystical',
    sugarvale: 'sweet',
  };

  const tag = tagMap[theme] || 'adventure'; // Fallback tag if theme is not found

  // API call to Jamendo's tracks endpoint with the tag
  const response = await fetch(
    `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=1&tags=${tag}&audioformat=mp31`
  );

  const data = await response.json(); // Converts the response to JSON

  return data.results.length > 0 ? data.results[0].audio : null; // Returns the audio URL of the first track if available
}

// Function to play background music from the fetched URL using a passed-in <audio> reference
export function playBackground(audioUrl, audioRef) {
  if (audioRef.current) {
    audioRef.current.src = audioUrl; // Sets the audio source
    audioRef.current.play(); // Starts playing the audio
  }
}