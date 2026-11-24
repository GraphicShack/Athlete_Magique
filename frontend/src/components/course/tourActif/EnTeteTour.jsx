// Responsabilité : le bandeau du tour (avatar, petit texte pis nom du perso).

import AvatarPersonnage from '@/components/commun/jeu/AvatarPersonnage.jsx';
import { Bandeau, SurTitre, NomPersonnage } from './EnTeteTour.styles.js';

// Props : personnage, surTitre (ex. « À toi de jouer, Félix »).
function EnTeteTour({ personnage, surTitre }) {
  return (
    <Bandeau>
      <AvatarPersonnage initiales={personnage.initiales} image={personnage.image} />
      <div>
        <SurTitre>{surTitre}</SurTitre>
        <NomPersonnage>{personnage.nom}</NomPersonnage>
      </div>
    </Bandeau>
  );
}

export default EnTeteTour;
