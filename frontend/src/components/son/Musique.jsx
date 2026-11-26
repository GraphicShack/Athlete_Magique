// Responsabilité : joue une musique en boucle, ou la met en pause (rien d'affiché).

import { useEffect, useRef } from 'react';

// Props : source (le fichier), joue (true = elle joue), volume (0 à 100).
function Musique({ source, joue, volume }) {
  const lecteur = useRef(null); // le lecteur audio, créé une seule fois

  // Création du lecteur au premier affichage ; on l'arrête si le composant disparaît.
  useEffect(() => {
    const audio = new Audio(source);
    audio.preload = 'none'; // téléchargée juste quand elle joue
    audio.loop = true;
    lecteur.current = audio;
    return () => audio.pause();
  }, [source]);

  // Le volume du lecteur va de 0 à 1 ; celui du curseur, de 0 à 100.
  useEffect(() => {
    lecteur.current.volume = volume / 100;
  }, [volume]);

  // Quand « joue » change : on joue, ou on met en pause.
  useEffect(() => {
    const audio = lecteur.current;

    if (!joue) {
      audio.pause();
      return undefined;
    }

    // Démarre la musique ; si le navigateur refuse (pas encore de clic), on réessaiera.
    function jouer() {
      audio.play().catch(() => {});
    }

    jouer();
    // Le premier clic ou la première touche débloque le son.
    document.addEventListener('pointerdown', jouer, { once: true });
    document.addEventListener('keydown', jouer, { once: true });

    return () => {
      document.removeEventListener('pointerdown', jouer);
      document.removeEventListener('keydown', jouer);
    };
  }, [joue]);

  return null;
}

export default Musique;
