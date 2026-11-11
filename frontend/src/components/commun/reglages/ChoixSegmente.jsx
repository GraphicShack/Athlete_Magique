/*
 * ChoixSegmente.jsx : un réglage à choisir parmi quelques options côte à côte
 * (ex. « Lente · Normale · Rapide »), dans une ligne de réglage.
 *
 * Responsabilité : placer le nom du réglage à gauche et la barre de choix (BarreChoix) à droite.
 *
 * Props :
 *   etiquette       : nom du réglage
 *   options         : textes des choix, ex. ['Lente', 'Normale', 'Rapide']
 *   valeurParDefaut : le choix coché au départ
 */
import { useId } from 'react';
import { Ligne, Nom } from './LigneReglage.js';
import BarreChoix from './BarreChoix.jsx';

function ChoixSegmente({ etiquette, options, valeurParDefaut }) {
  // Relie la barre à son nom, pour les lecteurs d'écran.
  const idEtiquette = useId();

  return (
    // Ici la ligne est une <div> : une <label> ne peut pas contenir plusieurs boutons radio.
    <Ligne as="div">
      <Nom id={idEtiquette}>{etiquette}</Nom>
      <BarreChoix options={options} valeurParDefaut={valeurParDefaut} aria-labelledby={idEtiquette} />
    </Ligne>
  );
}

export default ChoixSegmente;
