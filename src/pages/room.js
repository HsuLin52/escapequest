import { useRouter } from 'next/router';
import EscapeRoom from '../components/EscapeRoom'; // Importing the EscapeRoom component that will render the puzzle interface

// Escape room page component
export default function RoomPage() {
  const router = useRouter();
  const { theme } = router.query; // Destructuring the theme query parameter from the URL

  return <EscapeRoom theme={theme} />;
}