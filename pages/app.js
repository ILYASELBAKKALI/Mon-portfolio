// pages/_app.js
import '../styles/main.css';
import Head from 'next/head'; // Pour la gestion des métadonnées et des titres de pages

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Mon Portfolio</title> {/* Titre de la page */}
        <meta name="description" content="Bienvenue sur mon portfolio!" /> {/* Métadonnées */}
        <link rel="icon" href="/logoilyas.png" />
      </Head>
      <Component {...pageProps} /> {/* Chaque page aura ce composant */}
    </>
  );
}

export default MyApp;
