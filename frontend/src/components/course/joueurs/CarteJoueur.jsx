// Responsabilité : la carte d'un joueur pendant la course (perso, case, points, état).
// Utilisé dans : ListeJoueurs

import AvatarPersonnage from '@/components/commun/jeu/AvatarPersonnage.jsx';
import { textePosition, textePoints, texteEtat } from '@/utils/textesJoueur.js';
import { Carte, Infos, Nom, Detail, Points } from './CarteJoueur.styles.js';

// Affiche la carte du joueur ; « actif » la met en évidence.
function CarteJoueur({ joueur, actif = false }) {
  const { nom, bot, couleur, personnage, position, etat, points } = joueur;
  const etatAffiche = texteEtat(etat);

  return (
    // aria-current : les lecteurs d'écran annoncent le joueur dont c'est le tour.
    <Carte $couleur={couleur} $actif={actif} aria-current={actif ? 'true' : undefined}>
      <AvatarPersonnage initiales={personnage.initiales} image={personnage.image} />
      <Infos>
        <Nom>
          {nom}
          {bot && ' (bot)'}
        </Nom>
        <Detail>
          {personnage.nom} · {textePosition(position)}
          {etatAffiche && ` · ${etatAffiche}`}
        </Detail>
      </Infos>
      <Points>{textePoints(points)}</Points>
    </Carte>
  );
}

export default CarteJoueur;
