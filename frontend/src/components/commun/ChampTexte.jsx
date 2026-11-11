/*
 * ChampTexte.jsx : un champ de saisie avec son étiquette au-dessus (pseudo, courriel, mot de passe…).
 *
 * Responsabilités :
 *   - donner le même style à tous les champs de formulaire ;
 *   - relier l'étiquette au champ : cliquer sur l'étiquette place le curseur dans le champ.
 *
 * Props :
 *   etiquette       : texte affiché au-dessus du champ
 *   etiquetteCachee : true pour ne pas afficher l'étiquette (elle reste lue par les lecteurs d'écran)
 *   autres          : transmises au champ <input> (type, placeholder, autoComplete…)
 */
import { useId } from 'react';
import styled from 'styled-components';
import { cacheVisuellement } from '../../styles/base/utilitaires.js';

function ChampTexte({ etiquette, etiquetteCachee = false, ...props }) {
  // Identifiant unique, généré par React, qui relie l'étiquette (htmlFor) au champ (id).
  const id = useId();

  return (
    <Groupe>
      <Etiquette htmlFor={id} $cachee={etiquetteCachee}>
        {etiquette}
      </Etiquette>
      <Champ id={id} type="text" {...props} />
    </Groupe>
  );
}

// L'étiquette au-dessus du champ.
const Groupe = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(1)};
`;

const Etiquette = styled.label`
  font-size: ${({ theme }) => theme.texte.sm};
  font-weight: ${({ theme }) => theme.graisses.forte};
  ${({ $cachee }) => $cachee && cacheVisuellement}
`;

// Champ blanc à contour noir.
const Champ = styled.input`
  padding: ${({ theme }) => theme.espace(2.5)} ${({ theme }) => theme.espace(3)};
  border: ${({ theme }) => theme.bordures.contour};
  border-radius: ${({ theme }) => theme.rayons.sm};
  background: ${({ theme }) => theme.couleurs.surface};
  color: ${({ theme }) => theme.couleurs.encre};
  font: inherit;

  /* Texte d'exemple, en gris. */
  &::placeholder {
    color: ${({ theme }) => theme.couleurs.gris500};
  }
`;

export default ChampTexte;
