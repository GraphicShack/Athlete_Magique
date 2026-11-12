/*
 * PanneauJoueurs.styles.js : l'apparence de PanneauJoueurs (PanneauJoueurs.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * PanneauJoueurs.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';
import Liste from '@/components/commun/ui/Liste.jsx';

// Petite phrase d'explication sous le nombre de joueurs.
export const Aide = styled.p`
  margin: ${({ theme }) => theme.espace(2)} 0 ${({ theme }) => theme.espace(6)};
  font-size: ${({ theme }) => theme.texte.sm};
  color: ${({ theme }) => theme.couleurs.gris700};
`;

// « Nombre de joueurs » et « Qui joue ? », en italique très gras comme les titres du livret.
export const SousTitre = styled.h3`
  margin: 0 0 ${({ theme }) => theme.espace(3)};
  font-size: ${({ theme }) => theme.texte.lg};
  font-style: italic;
  font-weight: 900;
`;

// Les places l'une sous l'autre.
// La liste prend la hauteur restante du panneau.
export const ListePlaces = styled(Liste)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(3)};
`;
