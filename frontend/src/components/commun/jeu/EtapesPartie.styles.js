/*
 * EtapesPartie.styles.js : l'apparence de EtapesPartie (EtapesPartie.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * EtapesPartie.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';
import Liste from '@/components/commun/ui/Liste.jsx';
import { rondCentre } from '@/styles/base/utilitaires.js';

// Les étapes côte à côte ; elles passent à la ligne sur un écran étroit.
export const ListeEtapes = styled(Liste)`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.espace(3)} ${({ theme }) => theme.espace(6)};
`;

// Une étape : sa pastille et son nom, posés sur le fond noir de la page.
export const Etape = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(2)};
  color: ${({ theme, $courante }) => ($courante ? theme.couleurs.texteSurPage : theme.couleurs.texteSurPageDoux)};
  font-weight: ${({ theme, $courante }) => ($courante ? theme.graisses.tresForte : theme.graisses.normale)};
`;

// Rond numéroté : plein et blanc pour l'étape en cours, simplement entouré pour les autres.
export const Pastille = styled.span`
  ${rondCentre}
  width: 2rem;
  height: 2rem;
  border: 2px solid currentColor;
  background: ${({ theme, $courante }) => ($courante ? theme.couleurs.texteSurPage : 'transparent')};
  color: ${({ theme, $courante }) => ($courante ? theme.couleurs.encre : 'inherit')};
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: ${({ theme }) => theme.texte.sm};
  font-weight: ${({ theme }) => theme.graisses.tresForte};
`;
