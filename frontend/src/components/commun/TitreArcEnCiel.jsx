/*
 * TitreArcEnCiel.jsx : grand titre de page en capitales très grasses, chaque lettre d'une
 * couleur différente, comme les titres du livret de règles.
 *
 * Responsabilités :
 *   - découper le texte en mots, puis en lettres, et donner à chaque lettre la couleur suivante
 *     de theme.arcEnCiel ;
 *   - faire flotter chaque lettre (l'animation est dans styles/animations/flottement.js) ;
 *   - faire lire le titre en entier par les lecteurs d'écran (aria-label), pas lettre par lettre.
 *
 * Props :
 *   children : le texte du titre (une chaîne de caractères)
 *   autres   : transmises au <h1> (ex. className="mb-4")
 */
import { Fragment } from 'react';
import styled, { useTheme } from 'styled-components';
import { flottement, rythmeFlottement } from '../../styles/animations/flottement.js';

function TitreArcEnCiel({ children, ...props }) {
  const { arcEnCiel } = useTheme();
  let rang = 0; // rang de la lettre dans tout le titre (les espaces ne comptent pas)

  return (
    <Titre aria-label={children} {...props}>
      {/* Chaque mot est gardé en un seul bloc, pour qu'il ne soit jamais coupé en fin de ligne. */}
      {children.split(' ').map((mot, positionMot) => (
        <Fragment key={positionMot}>
          {/* Un vrai espace avant chaque mot (sauf le premier) : c'est là que la ligne peut se couper. */}
          {positionMot > 0 && ' '}
          <Mot aria-hidden="true">
            {[...mot].map((lettre, positionLettre) => {
              // Après la dernière couleur, on recommence à la première (%).
              const couleur = arcEnCiel[rang % arcEnCiel.length];
              const style = { color: couleur, ...rythmeFlottement(rang) };
              rang += 1;
              return (
                <Lettre key={positionLettre} style={style}>
                  {lettre}
                </Lettre>
              );
            })}
          </Mot>
        </Fragment>
      ))}
    </Titre>
  );
}

// La taille suit la largeur de l'écran (6vw), entre 2,25rem et 4,5rem.
const Titre = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: clamp(2.25rem, 6vw, 4.5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  text-transform: uppercase;
`;

// Un mot du titre : un seul bloc, qui passe à la ligne en entier.
const Mot = styled.span`
  display: inline-block;
`;

// Une lettre du titre, qui flotte (voir styles/animations/flottement.js).
// « inline-block » est nécessaire pour pouvoir déplacer une lettre (transform).
const Lettre = styled.span`
  display: inline-block;
  ${flottement}
`;

export default TitreArcEnCiel;
