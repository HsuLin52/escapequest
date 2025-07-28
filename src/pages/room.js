import { useRouter } from 'next/router';
import EscapeRoom from '../components/EscapeRoom';

export default function RoomPage() {
  const router = useRouter();
  const { theme } = router.query;

  return theme ? <EscapeRoom theme={theme} /> : <p>Loading...</p>;
}