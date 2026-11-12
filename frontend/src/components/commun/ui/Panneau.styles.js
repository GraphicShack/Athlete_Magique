/*
 * Panneau.styles.js : l'apparence de Panneau (Panneau.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * Panneau.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';

// Couleur de la teinte, ou blanc si le panneau n'en a pas.
const couleurTeinte = ({ theme, $teinte }) => theme.teintes[$teinte] ?? theme.couleurs.surface;

// La carte : fond blanc, contour noir, coins arrondis et cadre rétro.
export const Cadre = styled.section`
  --teinte: ${couleurTeinte};
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden; /* le bandeau suit les coins arrondis */
  color: ${({ theme }) => theme.couleurs.encre}; /* texte noir sur la carte blanche */
  background: ${({ theme }) => theme.couleurs.surface};
  border: ${({ theme }) => theme.bordures.contour};
  border-radius: ${({ theme }) => theme.rayons.lg};
  box-shadow: ${({ theme, $enEvidence }) => ($enEvidence ? theme.ombres.cadreFort : theme.ombres.cadre)};
`;

// Bandeau de titre, de la couleur du sujet ; le petit texte passe dessous s'il manque de place.
export const Bandeau = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.espace(1)} ${({ theme }) => theme.espace(4)};
  padding: ${({ theme }) => theme.espace(3)} ${({ theme }) => theme.espace(5)};
  background: ${couleurTeinte};
  border-bottom: ${({ theme }) => theme.bordures.contour};
`;

// Titre en italique très gras, comme les accroches du livret.
export const Titre = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.texte.lg};
  font-style: italic;
  font-weight: 900;
`;

// Petit texte à droite du titre.
export const Aside = styled.span`
  font-size: ${({ theme }) => theme.texte.xs};
  font-weight: ${({ theme }) => theme.graisses.moyenne};
`;

// Le contenu remplit le reste de la carte.
export const Contenu = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  padding: ${({ theme }) => theme.espace(5)};
`;
