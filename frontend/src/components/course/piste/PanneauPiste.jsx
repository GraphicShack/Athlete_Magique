/*
 * PanneauPiste.jsx : le bloc « La piste » de l'écran de course.
 *
 * Responsabilité : mettre le plateau (Piste) et sa légende (LegendePiste) dans un panneau vert.
 *
 * Props : les mêmes que Piste (jetons, rochers, etoiles, podium), transmises telles quelles.
 */
import Panneau from '@/components/commun/ui/Panneau.jsx';
import Piste from './Piste.jsx';
import LegendePiste from './LegendePiste.jsx';

function PanneauPiste(props) {
  return (
    <Panneau titre="La piste" teinte="piste" aside="Départ en haut à gauche, sens des aiguilles d'une montre.">
      <Piste {...props} />
      <LegendePiste />
    </Panneau>
  );
}

export default PanneauPiste;
