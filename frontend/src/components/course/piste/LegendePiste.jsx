/*
 * LegendePiste.jsx : la légende des symboles de la piste, affichée sous le plateau.
 *
 * Responsabilité : expliquer chaque symbole avec un exemple dessiné
 * (case étoile, rocher, pion tombé, pion actif).
 */
import { useTheme } from 'styled-components';
import Jeton from '@/components/commun/jeu/Jeton.jsx';
import imageRocher from '@/assets/images/rocher.png';
import { ListeLegende, Element, Exemple, Carre, Image } from './LegendePiste.styles.js';

function LegendePiste() {
  const theme = useTheme();
  // Un élément de légende : un exemple à gauche, son explication à droite.
  const elements = [
    { id: 'etoile', exemple: <Carre $couleur={theme.piste.etoile} />, texte: 'Étoile : +1 pt' },
    { id: 'rocher', exemple: <Image src={imageRocher} alt="" />, texte: 'Rocher : on trébuche' },
    { id: 'tombe', exemple: <Jeton couleur={theme.couleurs.gris500} initiales="" tombe />, texte: 'Tombé : passe son prochain déplacement' },
    { id: 'actif', exemple: <Jeton couleur={theme.couleurs.gris500} initiales="" actif />, texte: 'Pion actif' },
  ];

  return (
    <ListeLegende as="ul">
      {elements.map(({ id, exemple, texte }) => (
        <Element key={id}>
          <Exemple>{exemple}</Exemple>
          {texte}
        </Element>
      ))}
    </ListeLegende>
  );
}

export default LegendePiste;
