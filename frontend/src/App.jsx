/*
 * App.jsx : cadre commun à toutes les pages.
 *
 * Responsabilités :
 *   - afficher la page demandée à l'endroit de <Outlet /> (choisie par routes.jsx) ;
 *   - garder les boutons « Règles » et « Paramètres » en bas à droite, sur toutes les pages ;
 *   - garder la musique des menus (MusiqueMenu) et le fond animé (FondAnime) d'une page à l'autre ;
 *   - retenir les réglages du son (musique oui / non, volume), partagés entre la musique
 *     et la fenêtre des paramètres.
 */
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AccesParametres from './components/parametres/AccesParametres.jsx';
import AccesRegles from './components/regles/AccesRegles.jsx';
import MusiqueMenu from './components/son/MusiqueMenu.jsx';
import FondAnime from './components/commun/ui/FondAnime.jsx';
import { CoinFlottant } from './App.styles.js';

function App() {
  // Réglages du son : gardés ici, le plus proche parent commun de la musique et des paramètres.
  const [musiqueActive, setMusiqueActive] = useState(true);
  const [volume, setVolume] = useState(40); // 0 à 100
  const son = { musiqueActive, setMusiqueActive, volume, setVolume };

  return (
    // Classes Bootstrap : largeur maximale centrée, marges intérieures,
    // et au moins toute la hauteur de l'écran (la page peut remplir l'espace restant).
    <main className="container-xxl px-4 py-4 min-vh-100 d-flex flex-column">
      {/* Motif de pastilles et d'étoiles qui glisse derrière les pages du menu (pas sur la course) */}
      <FondAnime />

      <Outlet />

      {/* Musique de fond des menus (n'affiche rien) */}
      <MusiqueMenu active={musiqueActive} volume={volume} />

      {/* « Règles » puis « Paramètres » (tout à droite) */}
      <CoinFlottant>
        <AccesRegles />
        <AccesParametres son={son} />
      </CoinFlottant>
    </main>
  );
}

export default App;
