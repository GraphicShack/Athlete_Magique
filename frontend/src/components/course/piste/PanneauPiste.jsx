import Panneau from '../../commun/Panneau.jsx';
import Piste from './Piste.jsx';
import LegendePiste from './LegendePiste.jsx';

/**
 * Bloc « La piste » de l'écran de course : le plateau et sa légende dans un panneau.
 * Reçoit les mêmes données que Piste (jetons, rochers, etoiles, podium) et les lui transmet.
 */
function PanneauPiste(props) {
  return (
    <Panneau titre="La piste" aside="Départ en haut à gauche, sens des aiguilles d'une montre.">
      <Piste {...props} />
      <LegendePiste />
    </Panneau>
  );
}

export default PanneauPiste;
