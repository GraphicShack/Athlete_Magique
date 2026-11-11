/*
 * LegendePiste.jsx : la légende des symboles de la piste, affichée sous le plateau.
 *
 * Responsabilité : expliquer chaque symbole avec un exemple dessiné
 * (case étoile, rocher, pion tombé, pion actif).
 */
import styled, { useTheme } from 'styled-components';
import Jeton from './Jeton.jsx';
import Liste from '../../commun/Liste.jsx';

function LegendePiste() {
  const theme = useTheme();
  // Un élément de légende : un exemple à gauche, son explication à droite.
  const elements = [
    { id: 'etoile', exemple: <Carre $couleur={theme.piste.etoile} />, texte: 'Case étoile : +1 pt' },
    { id: 'rocher', exemple: <Carre $couleur={theme.piste.rocher} />, texte: 'Rocher : on trébuche' },
    { id: 'tombe', exemple: <Jeton couleur={theme.couleurs.gris500} initiales="" tombe />, texte: 'Tombé : saute son prochain déplacement' },
    { id: 'actif', exemple: <Jeton couleur={theme.couleurs.gris500} initiales="" actif />, texte: 'Pion actif' },
  ];

  return (
    <ListeLegende as="ul">
      {elements.map(({ id, exemple, texte }) => (
        <Element key={id}>
          {exemple}
          {texte}
        </Element>
      ))}
    </ListeLegende>
  );
}

// Les éléments côte à côte, qui passent à la ligne si besoin.
const ListeLegende = styled(Liste)`
  margin-top: ${({ theme }) => theme.espace(4)};
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.espace(2)} ${({ theme }) => theme.espace(5)};
  font-size: ${({ theme }) => theme.texte.sm};
  color: ${({ theme }) => theme.couleurs.gris700};
`;

const Element = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(2)};
`;

// Petit carré de couleur, comme une case de la piste.
const Carre = styled.span`
  width: 1rem;
  height: 1rem;
  border-radius: 3px;
  background: ${({ $couleur }) => $couleur};
`;

export default LegendePiste;
