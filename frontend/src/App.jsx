// Responsabilité : le cadre commun de toutes les pages (fond, musique, boutons Règles et Paramètres).

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AccesParametres from './components/parametres/AccesParametres.jsx';
import AccesRegles from './components/regles/AccesRegles.jsx';
import MusiqueMenu from './components/son/MusiqueMenu.jsx';
import FondAnime from './components/commun/ui/FondAnime.jsx';
import { CoinFlottant } from './App.styles.js';

// Garde les réglages du son pis place la page courante dans le cadre commun.
function App() {
  // Réglages du son : gardés ici, le plus proche parent commun de la musique pis des paramètres.
  const [musiqueActive, setMusiqueActive] = useState(true);
  const [volume, setVolume] = useState(40); // 0 à 100
  const son = { musiqueActive, setMusiqueActive, volume, setVolume };

  return (
    // Classes Bootstrap : largeur maximale centrée, marges intérieures, pis au moins toute la hauteur de l'écran (la page peut remplir l'espace restant).
    <main className="container-xxl px-4 py-4 min-vh-100 d-flex flex-column">
      <FondAnime />

      <Outlet />

      <MusiqueMenu active={musiqueActive} volume={volume} />

      <CoinFlottant>
        <AccesRegles />
        <AccesParametres son={son} />
      </CoinFlottant>
    </main>
  );
}

export default App;
