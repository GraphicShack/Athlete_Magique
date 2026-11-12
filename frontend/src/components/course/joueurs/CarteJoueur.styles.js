/*
 * CarteJoueur.styles.js : l'apparence de CarteJoueur (CarteJoueur.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * CarteJoueur.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';

// Avatar, infos et points sur une ligne.
export const Carte = styled.li`
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

export const Infos = styled.div`
  min-width: 0; /* permet au texte trop long d'être coupé au lieu de déborder */
`;

// Nom du joueur ; « … » s'il est trop long.
export const Nom = styled.div`
  font-weight: ${({ theme }) => theme.graisses.tresForte};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// « Personnage · Case 12 · tombé », en petit.
export const Detail = styled.div`
  font-size: ${({ theme }) => theme.texte.xs};
  color: ${({ theme }) => theme.couleurs.gris700};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Les points, en grand, italique très gras.
export const Points = styled.div`
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: ${({ theme }) => theme.texte.lg};
  font-style: italic;
  font-weight: 900;
  white-space: nowrap;
`;
