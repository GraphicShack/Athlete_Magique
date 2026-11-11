/*
 * Curseur.jsx : un réglage d'une valeur entre un minimum et un maximum (ex. « Volume »).
 *
 * Responsabilité : afficher un curseur du navigateur (input range) aux couleurs du thème,
 * avec son nom à gauche.
 *
 * Props :
 *   etiquette   : nom du réglage
 *   description : petite phrase d'aide sous le nom (optionnelle)
 *   autres      : transmises au curseur (min, max, defaultValue, onChange…)
 */
import styled from 'styled-components';
import { Ligne, Textes, Nom, Aide } from './LigneReglage.js';

function Curseur({ etiquette, description, ...props }) {
  return (
    <Ligne>
      <Textes>
        <Nom>{etiquette}</Nom>
        {description && <Aide>{description}</Aide>}
      </Textes>
      <Glissiere type="range" {...props} />
    </Ligne>
  );
}

// Le curseur, au plus 12rem de large.
const Glissiere = styled.input`
  width: min(12rem, 100%);
  accent-color: ${({ theme }) => theme.couleurs.encre}; /* couleur de la partie remplie et du bouton */
  cursor: pointer;
`;

export default Curseur;
