// Responsabilité : le panneau « La piste » : le plateau pis sa légende.

import Panneau from '@/components/commun/ui/Panneau.jsx';
import Etiquette from '@/components/commun/ui/Etiquette.jsx';
import Piste from './Piste.jsx';
import LegendePiste from './LegendePiste.jsx';
import { ZonePlateau, ZoneLegende } from './PanneauPiste.styles.js';

// Affiche le panneau avec « Course N sur M », la piste pis la légende.
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
