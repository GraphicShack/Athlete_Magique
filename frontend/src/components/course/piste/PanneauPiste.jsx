/*
 * PanneauPiste.jsx : le bloc « La piste » de l'écran de course : le plateau et sa légende,
 * dans un panneau vert.
 *
 * Responsabilités :
 *   - donner au plateau (Piste) toute la place disponible du panneau, sans le faire déborder ;
 *   - afficher la légende (LegendePiste), en petit, sous le plateau (sauf sur les écrans très bas).
 *
 * Props :
 *   numeroCourse  : 1 à 3, affiché « Course 2 sur 3 » dans le bandeau (rien si null)
 *   nombreCourses : 3 par défaut
 *   autres        : celles de Piste (jetons, rochers, etoiles, podium), transmises telles quelles
 */
import Panneau from '@/components/commun/ui/Panneau.jsx';
import Etiquette from '@/components/commun/ui/Etiquette.jsx';
import Piste from './Piste.jsx';
import LegendePiste from './LegendePiste.jsx';
import { ZonePlateau, ZoneLegende } from './PanneauPiste.styles.js';

function PanneauPiste({ numeroCourse = null, nombreCourses = 3, ...props }) {
  // Dans le bandeau, à droite du titre : « Course 2 sur 3 ».
  const course = numeroCourse && (
    <Etiquette>
      Course {numeroCourse} sur {nombreCourses}
    </Etiquette>
  );

  return (
    <Panneau titre="La piste" teinte="piste" aside={course}>
      <ZonePlateau>
        <Piste {...props} />
      </ZonePlateau>
      <ZoneLegende>
        <LegendePiste />
      </ZoneLegende>
    </Panneau>
  );
}

export default PanneauPiste;
