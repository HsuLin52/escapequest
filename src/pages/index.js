import { useRouter } from 'next/router';
import Head from 'next/head';

// Home Page component
export default function Home() {
  const router = useRouter(); // Initializing router for navigation

  // Function to handle theme selection and navigate to room page
  const handleSelect = (theme) => {
    router.push(`/room?theme=${theme}`);
  };

  // Page layout
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
        {/* Button group to select different escape room themes */}
        <div className="button-group">
          <button onClick={() => handleSelect('eldoria')}>🏰 Eldoria</button>
          <button onClick={() => handleSelect('mirrors')}>🪞 Mirrors</button>
          <button onClick={() => handleSelect('sugarvale')}>🧁 Sugarvale</button>
        </div>
      </div>
    </>
  );
}