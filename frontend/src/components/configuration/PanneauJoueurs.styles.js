// Responsabilité : définir le style de ce composant (styled-components).
// Utilisé dans : PanneauJoueurs

import styled from 'styled-components';
import Liste from '@/components/commun/ui/Liste.jsx';

// Petite phrase d'explication sous le nb de joueurs.
export const Aide = styled.p`
  margin: ${({ theme }) => theme.espace(2)} 0 ${({ theme }) => theme.espace(6)};
  font-size: ${({ theme }) => theme.texte.sm};
  color: ${({ theme }) => theme.couleurs.gris700};
`;

// « Nb de joueurs » pis « Qui joue ? », en italique très gras comme les titres du livret.
export const SousTitre = styled.h3`
  margin: 0 0 ${({ theme }) => theme.espace(3)};
  font-size: ${({ theme }) => theme.texte.lg};
  font-style: italic;
  font-weight: 900;
`;

// Les places l'une sous l'autre.
export const ListePlaces = styled(Liste)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(3)};
`;

// Le bouton du bas, sur toute la largeur.
export const Actions = styled.div`
  display: flex;
  margin-top: ${({ theme }) => theme.espace(6)};

  & > * {
    flex: 1;
  }
`;
