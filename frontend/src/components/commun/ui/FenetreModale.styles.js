/*
 * FenetreModale.styles.js : l'apparence de FenetreModale (FenetreModale.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * FenetreModale.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled, { css } from 'styled-components';
import { COURBE, fondu, apparaitre, tourner, grandir, retrecir } from '@/styles/animations/animations.js';

// Durée de l'animation de fermeture, en ms. Exportée : la fenêtre attend la fin de
// l'animation avant de se fermer vraiment (voir FenetreModale.jsx).
export const DUREE_FERMETURE = 250;

// Chaque bloc du contenu apparaît 45 ms après le précédent (8 premiers blocs).
function apparitionEnCascade() {
  let regles = '';
  for (let rang = 1; rang <= 8; rang += 1) {
    regles += `&:nth-child(${rang}) { animation-delay: ${150 + rang * 45}ms; }`;
  }
  return regles;
}

// La fenêtre elle-même : grandit à l'ouverture, rétrécit à la fermeture.
export const Dialogue = styled.dialog`
  --couleur-bouton: ${({ theme }) => theme.couleurs.encre};
  transform-origin: bottom right; /* grandit depuis le coin du bouton « Règles » */

  width: min(72rem, calc(100vw - 2rem));
  max-height: calc(100dvh - 2rem);
  padding: 0;
  border: ${({ theme }) => theme.bordures.contour};
  border-radius: ${({ theme }) => theme.rayons.lg};
  background: ${({ theme }) => theme.couleurs.page};
  color: inherit;
  box-shadow: ${({ theme }) => theme.ombres.cadreFort}; /* cadre rétro, comme les cartes */

  /* Le fond assombri derrière la fenêtre. */
  &::backdrop {
    background: color-mix(in srgb, ${({ theme }) => theme.couleurs.encre} 55%, transparent);
  }

  &[open] {
    animation: ${grandir} 450ms ${COURBE};
  }

  &[open]::backdrop {
    animation: ${fondu} 250ms ease-out;
  }

  ${({ $enFermeture }) =>
    $enFermeture &&
    css`
      &[open] {
        animation: ${retrecir} ${DUREE_FERMETURE}ms ease-in forwards;
      }
    `}

  /* Le joueur a demandé moins d'animations dans les réglages de son appareil. */
  @media (prefers-reduced-motion: reduce) {
    &[open],
    &[open] * {
      animation: none !important;
    }
  }
`;

// Le cadre remplit la fenêtre : un clic dessus n'est donc jamais pris pour un clic à l'extérieur.
export const Cadre = styled.div`
  display: flex;
  flex-direction: column;
  max-height: calc(100dvh - 2rem - 4px);
  animation: ${fondu} 200ms 120ms backwards; /* le contenu apparaît une fois la fenêtre lancée */
`;

// Bandeau du haut : titre à gauche, × à droite.
export const EnTete = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.espace(4)};
  padding: ${({ theme }) => theme.espace(4)} ${({ theme }) => theme.espace(6)};
  border-bottom: ${({ theme }) => theme.bordures.contour};
  background: ${({ theme, $teinte }) => theme.teintes[$teinte]}; /* même couleur que le bouton qui l'ouvre */
`;

// Même style que les bandeaux des cartes : italique très gras.
export const Titre = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.texte.xl};
  font-style: italic;
  font-weight: 900;
`;

// Bouton rond ×, qui arrive en tournant.
export const BoutonFermer = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  border: ${({ theme }) => theme.bordures.contour};
  border-radius: ${({ theme }) => theme.rayons.rond};
  background: ${({ theme }) => theme.couleurs.surface};
  font-size: ${({ theme }) => theme.texte.lg};
  line-height: 1;

  animation: ${tourner} 420ms ${COURBE} 120ms backwards;

  &:hover {
    background: ${({ theme }) => theme.couleurs.gris100};
  }
`;

// Seul le contenu défile ; l'en-tête et le bouton × restent visibles.
// Les blocs du contenu (enfants directs, et enfants d'une grille) apparaissent en cascade.
export const Corps = styled.div`
  overflow-y: auto;
  padding: ${({ theme }) => theme.espace(6)};

  & > *,
  & > * > * {
    animation: ${apparaitre} 320ms ${COURBE} backwards;
    ${apparitionEnCascade()}
  }
`;
