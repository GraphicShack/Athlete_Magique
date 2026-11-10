import styled, { useTheme } from 'styled-components';
import Jeton from './Jeton.jsx';
import Liste from '../../commun/Liste.jsx';

/** Légende des symboles de la piste, affichée sous le plateau. */
function LegendePiste() {
  const theme = useTheme();
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

const Carre = styled.span`
  width: 1rem;
  height: 1rem;
  border-radius: 3px;
  background: ${({ $couleur }) => $couleur};
`;

export default LegendePiste;
