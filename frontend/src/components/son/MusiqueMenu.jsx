// Responsabilité : joue la musique de fond des menus (rien d'affiché).
// Musique : « Lobby Loop » (assets/musique/musique-menu.mp3), générée avec Suno (IA), https://suno.com

import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import musique from '@/assets/musique/musique-menu.mp3';
import CHEMINS from '@/chemins.js';

// Joue ou met en pause la musique selon la page pis les réglages.
function MusiqueMenu({ active, volume }) {
  const lecteur = useRef(null); // le lecteur audio, créé une seule fois
  const { pathname } = useLocation(); // adresse de la page actuelle
  const doitJouer = active && pathname !== CHEMINS.course; // musique voulue, et pas en course

  // Création du lecteur au premier affichage ; on l'arrête si le composant disparaît.
  useEffect(() => {
    const audio = new Audio(musique);
    audio.loop = true;
    lecteur.current = audio;
    return () => audio.pause();
  }, []);

  // Le volume du lecteur va de 0 à 1 ; celui du curseur, de 0 à 100.
  useEffect(() => {
    lecteur.current.volume = volume / 100;
  }, [volume]);

  // À chaque changement de page ou de réglage : on joue, ou on met en pause.
  useEffect(() => {
    const audio = lecteur.current;

    if (!doitJouer) {
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
  }, [doitJouer]);

  return null;
}

export default MusiqueMenu;
