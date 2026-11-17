/*
 * LegendePiste.styles.js : l'apparence de LegendePiste (LegendePiste.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * LegendePiste.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';
import Liste from '@/components/commun/ui/Liste.jsx';

// Les éléments côte à côte, en petit, qui passent à la ligne si besoin.
export const ListeLegende = styled(Liste)`
  margin-top: ${({ theme }) => theme.espace(2)};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.espace(1)} ${({ theme }) => theme.espace(4)};
  font-size: ${({ theme }) => theme.texte.xs};
  line-height: 1.2;
  color: ${({ theme }) => theme.couleurs.gris700};
`;

export const Element = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(1.5)};
`;

// L'exemple à gauche de chaque explication, toujours de la même petite taille (0,9rem).
// Les pions d'exemple prennent exactement cette taille (leur taille normale suit le plateau).
export const Exemple = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 0.9rem;
  height: 0.9rem;

  & > span {
    width: 0.9rem;
    height: 0.9rem;
    border-width: 1px;
  }
`;

// Petit carré de couleur, comme une case de la piste.
export const Carre = styled.span`
  width: 100%;
  height: 100%;
  border-radius: 2px;
  background: ${({ $couleur }) => $couleur};
`;

// Petit dessin (ex. le rocher).
export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
