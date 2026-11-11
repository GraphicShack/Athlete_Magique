/*
 * useDefilement.js : hook (fonction React réutilisable) qui gère le défilement du carrousel.
 *
 * Responsabilités :
 *   - suivre le doigt ou la souris pendant un glisser ;
 *   - suivre le pavé tactile (défilement horizontal) ;
 *   - se caler sur la carte la plus proche à la fin du mouvement, puis prévenir la page ;
 *   - rejoindre la carte choisie par la page (flèches, clic) par le chemin le plus court.
 *
 * La « position » est un nombre décimal qui peut dépasser le nombre de cartes
 * (ex. 12,4) : seul son modulo compte. Grâce à ça, passer de la dernière carte
 * à la première est un simple pas en avant.
 *
 * Reçoit  : indexActif (la carte choisie par la page), total, onChange
 * Renvoie : position, enMouvement, et les fonctions à brancher sur la scène (gestionnaires)
 */
import { useEffect, useRef, useState } from 'react';
import { modulo, ecartCirculaire } from './placement.js';

const SENSIBILITE_GLISSER = 1.4; // glisser d'une largeur de carte avance d'environ 1,4 carte
const SENSIBILITE_MOLETTE = 1 / 180; // nombre de cartes avancées par pixel de pavé tactile
const DELAI_CALAGE = 140; // ms sans mouvement du pavé avant de se caler sur une carte
const SEUIL_CLIC = 5; // px : un déplacement plus petit est un simple clic

function useDefilement({ indexActif, total, onChange }) {
  const [position, setPosition] = useState(indexActif); // position affichée (décimale)
  const [enMouvement, setEnMouvement] = useState(false); // true pendant un glisser ou un défilement

  const glisser = useRef(null); // infos du glisser en cours (point de départ…)
  const minuterie = useRef(null); // minuterie du calage après le pavé tactile
  const positionActuelle = useRef(position); // dernière position connue, même entre deux rendus

  // Change la position, à la fois pour l'affichage (état) et pour les calculs (référence).
  function deplacer(nouvellePosition) {
    positionActuelle.current = nouvellePosition;
    setPosition(nouvellePosition);
  }

  // Se caler sur la carte la plus proche, puis prévenir la page.
  function caler() {
    const arrondie = Math.round(positionActuelle.current);
    setEnMouvement(false);
    deplacer(arrondie);
    onChange(modulo(arrondie, total));
  }

  // Quand la page change de carte (flèches, clic), on s'y rend par le chemin le plus court.
  useEffect(() => {
    if (enMouvement) return;
    const ecart = ecartCirculaire(indexActif - positionActuelle.current, total);
    deplacer(positionActuelle.current + ecart);
  }, [indexActif, enMouvement, total]);

  // On arrête la minuterie si le carrousel disparaît de la page.
  useEffect(() => () => clearTimeout(minuterie.current), []);

  // --- Glisser avec le doigt ou la souris

  // Doigt ou bouton de souris posé : on retient le point de départ.
  function surAppui(evenement) {
    const largeurCarte = evenement.currentTarget.firstElementChild.offsetWidth;
    glisser.current = { departX: evenement.clientX, departPosition: position, largeurCarte, aBouge: false };
  }

  // Doigt ou souris qui bouge : les cartes suivent.
  function surDeplacement(evenement) {
    if (!glisser.current) return;
    const { departX, departPosition, largeurCarte, aBouge } = glisser.current;
    const distance = evenement.clientX - departX;

    if (!aBouge) {
      if (Math.abs(distance) < SEUIL_CLIC) return; // encore un clic, pas un glisser
      glisser.current.aBouge = true;
      setEnMouvement(true);
      // La scène continue de recevoir le mouvement même si le pointeur en sort.
      evenement.currentTarget.setPointerCapture(evenement.pointerId);
    }

    // Glisser vers la gauche fait avancer (position plus grande).
    deplacer(departPosition - (distance / largeurCarte) * SENSIBILITE_GLISSER);
  }

  // Doigt ou bouton relâché : on se cale sur une carte si on a vraiment glissé.
  function surRelache() {
    const avaitBouge = glisser.current?.aBouge;
    glisser.current = null;
    if (avaitBouge) caler();
  }

  // Après un glisser, le relâchement ne doit pas compter comme un clic sur une carte.
  function surClicCapture(evenement) {
    if (enMouvement) evenement.stopPropagation();
  }

  // --- Pavé tactile : on suit le mouvement horizontal, puis on se cale après une pause.
  // Le défilement vertical est laissé à la page.

  function surMolette(evenement) {
    if (Math.abs(evenement.deltaX) <= Math.abs(evenement.deltaY)) return;
    setEnMouvement(true);
    deplacer(positionActuelle.current + evenement.deltaX * SENSIBILITE_MOLETTE);
    clearTimeout(minuterie.current);
    minuterie.current = setTimeout(caler, DELAI_CALAGE);
  }

  // Les gestionnaires sont « étalés » sur la scène par le carrousel : <Scene {...gestionnaires}>.
  return {
    position,
    enMouvement,
    gestionnaires: {
      onPointerDown: surAppui,
      onPointerMove: surDeplacement,
      onPointerUp: surRelache,
      onPointerCancel: surRelache,
      onClickCapture: surClicCapture,
      onWheel: surMolette,
    },
  };
}

export default useDefilement;
