/*
 * animations.js : les animations partagées de l'application.
 *
 * Responsabilité : définir une seule fois les petites animations réutilisables
 * (comme base/theme.js pour les couleurs).
 *
 * Un composant importe une animation puis l'utilise dans son style :
 *   import { fondu, COURBE } from '@/styles/animations/animations.js';
 *   const Bloc = styled.div` animation: ${fondu} 200ms ${COURBE}; `;
 *
 * Une animation plus complète (avec son propre réglage) a son propre fichier, ex. flottement.js ;
 * la transition entre les pages est dans rideau.js.
 */
import { keyframes } from 'styled-components';

// Courbe de vitesse : départ rapide, arrivée tout en douceur.
export const COURBE = 'cubic-bezier(0.32, 0.72, 0, 1)';

// Apparaître en transparence.
export const fondu = keyframes`
  from {
    opacity: 0;
  }
`;

// Apparaître en montant légèrement (ex. blocs d'une liste, en cascade).
export const apparaitre = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
`;

// Arriver en tournant (ex. le bouton × de la fenêtre).
export const tourner = keyframes`
  from {
    opacity: 0;
    transform: rotate(-135deg) scale(0.6);
  }
`;

// Grandir à partir d'un petit rond de la couleur d'un bouton (variable --couleur-bouton).
// Sert à l'ouverture des fenêtres (règles, paramètres) et de la bulle d'un personnage.
export const grandir = keyframes`
  from {
    transform: scale(0.08);
    border-radius: 999px;
    background-color: var(--couleur-bouton);
  }
`;

// Inverse de « grandir » : rétrécir en un petit rond et disparaître (fermeture d'une fenêtre).
export const retrecir = keyframes`
  to {
    transform: scale(0.18);
    border-radius: 999px;
    opacity: 0;
  }
`;
