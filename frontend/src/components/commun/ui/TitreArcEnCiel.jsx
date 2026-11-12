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
import { useTheme } from 'styled-components';
import { rythmeFlottement } from '@/styles/animations/flottement.js';
import { Titre, Mot, Lettre } from './TitreArcEnCiel.styles.js';

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

export default TitreArcEnCiel;
