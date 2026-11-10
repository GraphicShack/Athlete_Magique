import { useEffect, useId, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { COURBE, fondu, apparaitre, tourner, grandir, retrecir } from '../../styles/animations.js';

/**
 * Fenêtre qui s'ouvre par-dessus la page actuelle, sans la remplacer.
 * Basée sur l'élément HTML <dialog> : le navigateur gère lui-même la touche Échap,
 * le focus dans la fenêtre et le fond assombri.
 *
 * ouverte  : true pour l'afficher
 * onFermer : appelé quand la fenêtre est fermée (bouton ×, Échap ou clic à l'extérieur)
 * titre    : titre affiché en haut de la fenêtre
 *
 * Animation (en CSS, avec les animations de styles/animations.js) : la fenêtre grandit depuis le coin en bas à droite,
 * où se trouve le bouton « Règles », le × arrive en tournant et le contenu apparaît en cascade.
 */
const DUREE_FERMETURE = 250; // ms, doit correspondre à l'animation « retrecir »

function FenetreModale({ ouverte, onFermer, titre, children }) {
  const dialogue = useRef(null);
  const [enFermeture, setEnFermeture] = useState(false);
  const idTitre = useId();

  // Ouvrir ou fermer le <dialog> quand la page change « ouverte ».
  useEffect(() => {
    const element = dialogue.current;
    if (ouverte && !element.open) element.showModal();
    if (!ouverte && element.open) element.close();
  }, [ouverte]);

  // Fermeture par le joueur : on joue l'animation, puis on ferme vraiment.
  function fermer() {
    if (enFermeture) return;
    setEnFermeture(true);
    setTimeout(() => {
      dialogue.current.close();
      setEnFermeture(false);
      onFermer();
    }, DUREE_FERMETURE);
  }

  // Touche Échap : on remplace la fermeture immédiate du navigateur par la nôtre, animée.
  function surEchap(evenement) {
    evenement.preventDefault();
    fermer();
  }

  // Un clic sur le fond assombri (en dehors du cadre) ferme la fenêtre.
  function surClic(evenement) {
    if (evenement.target === dialogue.current) fermer();
  }

  return (
    <Dialogue
      ref={dialogue}
      $enFermeture={enFermeture}
      onCancel={surEchap}
      onClick={surClic}
      aria-labelledby={idTitre}
    >
      <Cadre>
        <EnTete>
          <Titre id={idTitre}>{titre}</Titre>
          <BoutonFermer type="button" onClick={fermer} aria-label="Fermer">
            ×
          </BoutonFermer>
        </EnTete>
        <Corps>{children}</Corps>
      </Cadre>
    </Dialogue>
  );
}

// --- Animations : définies dans styles/animations.js ---

// Chaque bloc du contenu apparaît 45 ms après le précédent (8 premiers blocs).
function apparitionEnCascade() {
  let regles = '';
  for (let rang = 1; rang <= 8; rang += 1) {
    regles += `&:nth-child(${rang}) { animation-delay: ${150 + rang * 45}ms; }`;
  }
  return regles;
}

const Dialogue = styled.dialog`
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
const Cadre = styled.div`
  display: flex;
  flex-direction: column;
  max-height: calc(100dvh - 2rem - 4px);
  animation: ${fondu} 200ms 120ms backwards; /* le contenu apparaît une fois la fenêtre lancée */
`;

const EnTete = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.espace(4)};
  padding: ${({ theme }) => theme.espace(4)} ${({ theme }) => theme.espace(6)};
  border-bottom: ${({ theme }) => theme.bordures.contour};
  background: ${({ theme }) => theme.teintes.regles}; /* même rouge que le bouton « Règles » */
`;

// Même style que les bandeaux des cartes : italique très gras.
const Titre = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.texte.xl};
  font-style: italic;
  font-weight: 900;
`;

const BoutonFermer = styled.button`
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
const Corps = styled.div`
  overflow-y: auto;
  padding: ${({ theme }) => theme.espace(6)};

  & > *,
  & > * > * {
    animation: ${apparaitre} 320ms ${COURBE} backwards;
    ${apparitionEnCascade()}
  }
`;

export default FenetreModale;
