/*
 * LegendePiste.jsx : la légende des symboles de la piste, affichée sous le plateau.
 *
 * Responsabilité : expliquer chaque symbole avec un exemple dessiné
 * (case étoile, rocher, pion tombé, pion actif).
 */
import { useTheme } from 'styled-components';
import Jeton from './Jeton.jsx';
import { ListeLegende, Element, Carre } from './LegendePiste.styles.js';

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

export default LegendePiste;
