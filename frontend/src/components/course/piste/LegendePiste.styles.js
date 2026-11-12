/*
 * LegendePiste.styles.js : l'apparence de LegendePiste (LegendePiste.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * LegendePiste.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';
import Liste from '@/components/commun/ui/Liste.jsx';

// Les éléments côte à côte, qui passent à la ligne si besoin.
export const ListeLegende = styled(Liste)`
  margin-top: ${({ theme }) => theme.espace(4)};
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.espace(2)} ${({ theme }) => theme.espace(5)};
  font-size: ${({ theme }) => theme.texte.sm};
  color: ${({ theme }) => theme.couleurs.gris700};
`;

export const Element = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(2)};
`;

// Petit carré de couleur, comme une case de la piste.
export const Carre = styled.span`
  width: 1rem;
  height: 1rem;
  border-radius: 3px;
  background: ${({ $couleur }) => $couleur};
`;
