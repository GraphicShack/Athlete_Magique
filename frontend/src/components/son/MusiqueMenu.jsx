/*
 * MusiqueMenu.jsx : la musique de fond des menus (accueil, configuration, sélection, règles…).
 *
 * Responsabilités :
 *   - jouer la musique en boucle sur toutes les pages, sauf pendant la course ;
 *   - suivre les réglages du joueur : musique coupée ou non, et volume ;
 *   - la démarrer au premier clic ou à la première touche du joueur, parce que les navigateurs
 *     bloquent le son tant que le joueur n'a pas touché à la page.
 *
 * N'affiche rien à l'écran (renvoie null). Placé une seule fois, dans App.jsx :
 * il reste donc en place quand on change de page, et la musique ne recommence pas au début.
 *
 * Props :
 *   active : false pour couper la musique (interrupteur « Musique » des paramètres)
 *   volume : 0 à 100 (curseur « Volume général » des paramètres)
 */
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import musique from '@/assets/musique/musique-menu.mp3';
import CHEMINS from '@/chemins.js';

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
