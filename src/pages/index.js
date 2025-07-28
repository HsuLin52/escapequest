import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();

  const handleSelect = (theme) => {
    router.push(`/room?theme=${theme}`);
  };

  return (
    <>
      <Head>
        <title>EscapeQuest</title>
      </Head>
      <div className="home-container">
        <h1 className="home-title">EscapeQuest</h1>
        <p className="welcome-message">
          Welcome, Detective! Choose your theme and begin your quest to escape before time runs out.
        </p>
        <div className="button-group">
          <button onClick={() => handleSelect('eldoria')}>🏰 Eldoria</button>
          <button onClick={() => handleSelect('mirrors')}>🪞 Mirrors</button>
          <button onClick={() => handleSelect('sugarvale')}>🧁 Sugarvale</button>
        </div>
      </div>
    </>
  );
}