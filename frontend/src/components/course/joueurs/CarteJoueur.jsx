/*
 * CarteJoueur.jsx : la petite carte d'un joueur, comme sur un tableau des scores.
 *
 * Responsabilité : afficher une bande à la couleur de son pion, l'avatar de son personnage,
 * son nom, sa case, son état et ses points. Les textes viennent de textesJoueur.js.
 *
 * Props :
 *   joueur : { nom, bot, couleur, personnage: { id, nom, initiales }, position, etat, points }
 *   actif  : true si c'est le tour de ce joueur (cadre rétro autour de la carte)
 */
import styled from 'styled-components';
import AvatarPersonnage from '../../commun/AvatarPersonnage.jsx';
import { textePosition, textePoints, texteEtat } from './textesJoueur.js';

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

// Avatar, infos et points sur une ligne.
const Carte = styled.li`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: ${({ theme }) => theme.espace(3)};
  padding: ${({ theme }) => theme.espace(3)};
  /* Bande épaisse à gauche, à la couleur du pion du joueur sur la piste. */
  border: ${({ theme }) => theme.bordures.contour};
  border-left: 10px solid ${({ $couleur }) => $couleur};
  border-radius: ${({ theme }) => theme.rayons.md};
  background: ${({ theme }) => theme.couleurs.surface};
  color: ${({ theme }) => theme.couleurs.encre};
  box-shadow: ${({ theme, $actif }) => ($actif ? theme.ombres.cadre : 'none')};
`;

const Infos = styled.div`
  min-width: 0; /* permet au texte trop long d'être coupé au lieu de déborder */
`;

// Nom du joueur ; « … » s'il est trop long.
const Nom = styled.div`
  font-weight: ${({ theme }) => theme.graisses.tresForte};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// « Personnage · Case 12 · tombé », en petit.
const Detail = styled.div`
  font-size: ${({ theme }) => theme.texte.xs};
  color: ${({ theme }) => theme.couleurs.gris700};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Les points, en grand, italique très gras.
const Points = styled.div`
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: ${({ theme }) => theme.texte.lg};
  font-style: italic;
  font-weight: 900;
  white-space: nowrap;
`;

export default CarteJoueur;
