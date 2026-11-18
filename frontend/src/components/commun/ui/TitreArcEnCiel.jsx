// Responsabilité : le gros titre de page, une couleur par lettre comme dans le livret.
// Utilisé dans : ClassementPage, ConfigurationPage, ReglesPage, SelectionPage

import { Fragment } from 'react';
import { useTheme } from 'styled-components';
import { rythmeFlottement } from '@/styles/animations/flottement.js';
import { Titre, Mot, Lettre } from './TitreArcEnCiel.styles.js';

// Découpe le titre en lettres pis donne une couleur à chacune.
// Props : children (le titre), + le reste va au <h1>.
function TitreArcEnCiel({ children, ...props }) {
  const { arcEnCiel } = useTheme();
  let rang = 0; // rang de la lettre dans tout le titre (les espaces ne comptent pas)

  return (
    <Titre aria-label={children} {...props}>
      {children.split(' ').map((mot, positionMot) => (
        <Fragment key={positionMot}>
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
