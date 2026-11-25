// Responsabilité : la carte d'un joueur (rang, avatar, nom, détail, points).

import AvatarPersonnage from '@/components/commun/jeu/AvatarPersonnage.jsx';
import { Carte, Rang, Infos, Nom, Detail, Points, DessusCarte } from './CarteJoueur.styles.js';

// Affiche la carte, avec une bordure de la couleur du joueur.
// Props : nom, detail pis points (textes), couleur, personnage, actif (true = en évidence), rang (optionnel, dans un rond),
// children (optionnel, par-dessus le haut de la carte).
function CarteJoueur({ nom, detail, points, couleur, personnage, actif = false, rang, children }) {
  return (
    // aria-current : les lecteurs d'écran annoncent le joueur en évidence.
    <Carte $couleur={couleur} $actif={actif} aria-current={actif ? 'true' : undefined}>
      {rang && <Rang>{rang}</Rang>}
      <AvatarPersonnage initiales={personnage.initiales} image={personnage.image} />
      <Infos>
        <Nom>{nom}</Nom>
        <Detail>{detail}</Detail>
      </Infos>
      <Points>{points}</Points>
      {children && <DessusCarte>{children}</DessusCarte>}
    </Carte>
  );
}

export default CarteJoueur;
