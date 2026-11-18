// Responsabilité : définir le style de ce composant (styled-components).
// Utilisé dans : EtapesTour

import styled from 'styled-components';
import Liste from '@/components/commun/ui/Liste.jsx';
import { rondCentre, cacheVisuellement } from '@/styles/base/utilitaires.js';

// Couleur de la pastille numérotée selon le statut.
const COULEURS_PASTILLE = {
  passee: (theme) => theme.couleurs.gris700,
  courante: (theme) => theme.couleurs.encre,
  avenir: (theme) => theme.couleurs.gris300,
};

// Les étapes côte à côte, sur une ligne.
export const ListeEtapes = styled(Liste)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.espace(1.5)};
`;

// Une étape : sa pastille et son nom ; l'étape en cours est en noir et en gras.
export const Etape = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(3)};
  color: ${({ theme, $statut }) => ($statut === 'courante' ? theme.couleurs.encre : theme.couleurs.gris500)};
  font-weight: ${({ theme, $statut }) => ($statut === 'courante' ? theme.graisses.tresForte : theme.graisses.normale)};
`;

// Petit rond avec le numéro de l'étape.
export const Pastille = styled.span`
  ${rondCentre}
  width: 1.5rem;
  height: 1.5rem;
  background: ${({ theme, $statut }) => COULEURS_PASTILLE[$statut](theme)};
  color: ${({ theme }) => theme.couleurs.surface};
  font-size: ${({ theme }) => theme.texte.xs};
  font-weight: ${({ theme }) => theme.graisses.forte};
`;

// Le nom de l'étape ; caché à l'écran (mais lu par les lecteurs d'écran) si $cache est vrai.
export const Libelle = styled.span`
  ${({ $cache }) => $cache && cacheVisuellement}
`;
