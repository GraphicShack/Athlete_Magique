/*
 * CarteJoueur.jsx : la petite carte d'un joueur, comme sur un tableau des scores.
 *
 * Responsabilité : afficher une bande à la couleur de son pion, l'avatar de son personnage,
 * son nom, sa case, son état et ses points. Les textes viennent de utils/textesJoueur.js.
 *
 * Props :
 *   joueur : { nom, bot, couleur, personnage: { id, nom, initiales }, position, etat, points }
 *   actif  : true si c'est le tour de ce joueur (cadre rétro autour de la carte)
 */
import AvatarPersonnage from '@/components/commun/jeu/AvatarPersonnage.jsx';
import { textePosition, textePoints, texteEtat } from '@/utils/textesJoueur.js';
import { Carte, Infos, Nom, Detail, Points } from './CarteJoueur.styles.js';

function CarteJoueur({ joueur, actif = false }) {
  const { nom, bot, couleur, personnage, position, etat, points } = joueur;
  const etatAffiche = texteEtat(etat);

  return (
    // aria-current : les lecteurs d'écran annoncent le joueur dont c'est le tour.
    <Carte $couleur={couleur} $actif={actif} aria-current={actif ? 'true' : undefined}>
      <AvatarPersonnage initiales={personnage.initiales} />
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
