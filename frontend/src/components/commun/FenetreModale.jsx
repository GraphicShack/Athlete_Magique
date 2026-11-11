/*
 * FenetreModale.jsx : une fenêtre qui s'ouvre par-dessus la page actuelle, sans la remplacer
 * (règles, paramètres).
 *
 * Responsabilités :
 *   - ouvrir et fermer la fenêtre selon la prop « ouverte » ;
 *   - la fermer par le bouton ×, la touche Échap ou un clic à l'extérieur, en jouant l'animation ;
 *   - l'animer : elle grandit depuis le coin en bas à droite (où sont les boutons),
 *     le × arrive en tournant et le contenu apparaît en cascade.
 *
 * Elle utilise l'élément HTML <dialog> : le navigateur gère lui-même le focus dans la fenêtre
 * et le fond assombri.
 *
 * Props :
 *   ouverte  : true pour l'afficher
 *   onFermer : appelé quand la fenêtre est fermée
 *   titre    : titre affiché dans le bandeau
 *   teinte   : couleur du bandeau (voir theme.teintes), rouge des règles par défaut
 *   children : le contenu de la fenêtre
 */
import { useEffect, useId, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { COURBE, fondu, apparaitre, tourner, grandir, retrecir } from '../../styles/animations/animations.js';

const DUREE_FERMETURE = 250; // ms, doit correspondre à l'animation « retrecir »

function FenetreModale({ ouverte, onFermer, titre, teinte = 'regles', children }) {
  const dialogue = useRef(null); // l'élément <dialog> de la page
  const [enFermeture, setEnFermeture] = useState(false); // true pendant l'animation de fermeture
  const idTitre = useId(); // relie la fenêtre à son titre, pour les lecteurs d'écran

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
      dialogue.current?.close(); // « ?. » : rien à fermer si la fenêtre a déjà quitté la page
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
        <EnTete $teinte={teinte}>
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

// Chaque bloc du contenu apparaît 45 ms après le précédent (8 premiers blocs).
function apparitionEnCascade() {
  let regles = '';
  for (let rang = 1; rang <= 8; rang += 1) {
    regles += `&:nth-child(${rang}) { animation-delay: ${150 + rang * 45}ms; }`;
  }
  return regles;
}

// La fenêtre elle-même : grandit à l'ouverture, rétrécit à la fermeture.
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
const Cadre = styled.div`
  display: flex;
  flex-direction: column;
  max-height: calc(100dvh - 2rem - 4px);
  animation: ${fondu} 200ms 120ms backwards; /* le contenu apparaît une fois la fenêtre lancée */
`;

// Bandeau du haut : titre à gauche, × à droite.
const EnTete = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.espace(4)};
  padding: ${({ theme }) => theme.espace(4)} ${({ theme }) => theme.espace(6)};
  border-bottom: ${({ theme }) => theme.bordures.contour};
  background: ${({ theme, $teinte }) => theme.teintes[$teinte]}; /* même couleur que le bouton qui l'ouvre */
`;

// Même style que les bandeaux des cartes : italique très gras.
const Titre = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.texte.xl};
  font-style: italic;
  font-weight: 900;
`;

// Bouton rond ×, qui arrive en tournant.
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
