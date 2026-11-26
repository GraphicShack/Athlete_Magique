// Responsabilité : le cadre commun de toutes les pages (fond, musique, boutons Règles et Paramètres).

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AccesParametres from './components/parametres/AccesParametres.jsx';
import AccesRegles from './components/regles/AccesRegles.jsx';
import MusiqueFond from './components/son/MusiqueFond.jsx';
import FondAnime from './components/commun/ui/FondAnime.jsx';
import useRideauAuHasard from './hooks/useRideauAuHasard.js';
import useAnimationsReduites from './hooks/useAnimationsReduites.js';
import { Cadre, CoinFlottant } from './App.styles.js';

// Garde les réglages pis place la page courante dans le cadre commun.
function App() {
  useRideauAuHasard(); // la transition entre les pages

  // Réglages du son : gardés ici, le plus proche parent commun de la musique pis des paramètres.
  const [musiqueActive, setMusiqueActive] = useState(true);
  const [volume, setVolume] = useState(15); // 0 à 100
  const son = { musiqueActive, setMusiqueActive, volume, setVolume };

  // Numéros sur la piste : gardés ici, parce que les paramètres les changent pis que la course les affiche.
  const [numerosVisibles, setNumerosVisibles] = useState(true);
  const [animationsReduites, setAnimationsReduites] = useAnimationsReduites();
  const affichage = { numerosVisibles, setNumerosVisibles, animationsReduites, setAnimationsReduites };

  return (
    <Cadre>
      <FondAnime />

      {/* context : ce que les pages peuvent lire avec useOutletContext (voir CoursePage). */}
      <Outlet context={{ numerosVisibles }} />

      <MusiqueFond active={musiqueActive} volume={volume} />

      <CoinFlottant>
        <AccesRegles />
        <AccesParametres son={son} affichage={affichage} />
      </CoinFlottant>
    </Cadre>
  );
}

export default App;
