import styled, { css } from 'styled-components';
import useDefilement from './useDefilement.js';
import { modulo, ecartCirculaire, placement } from './placement.js';

/*
 * Carrousel en « coverflow » : la carte active est au centre, de face ;
 * les autres sont empilées de chaque côté, tournées en perspective.
 * Il tourne en boucle : après la dernière carte vient la première.
 *
 * Le code est réparti en trois fichiers, chacun avec un seul rôle :
 *   - Carrousel.jsx    : l'affichage (ce fichier)
 *   - useDefilement.js : le glisser, le pavé tactile et le calage sur une carte
 *   - placement.js     : les calculs de position de chaque carte
 *
 * Réutilisable pour n'importe quel contenu : la page fournit les éléments
 * et la façon d'afficher chacun (rendu).
 *
 * elements   : tableau d'éléments à afficher
 * indexActif : rang de l'élément au centre
 * onChange   : appelé avec le nouveau rang quand le joueur change de carte
 * rendu      : (element) => contenu d'une carte
 * libelle    : (element) => texte lu par les lecteurs d'écran (ex. le nom)
 * largeur    : largeur d'une carte (par défaut 17rem)
 */

const CARTES_VISIBLES = 4; // nombre de cartes affichées de chaque côté du centre

function Carrousel({ elements, indexActif, onChange, rendu, libelle, largeur = '17rem' }) {
  const total = elements.length;
  const { position, enMouvement, gestionnaires } = useDefilement({ indexActif, total, onChange });

  const aller = (rang) => onChange(modulo(rang, total));
  const rangAuCentre = modulo(Math.round(position), total);

  function surClavier(evenement) {
    if (evenement.key === 'ArrowLeft') aller(indexActif - 1);
    if (evenement.key === 'ArrowRight') aller(indexActif + 1);
  }

  return (
    <Cadre>
      <Fleche type="button" onClick={() => aller(indexActif - 1)} aria-label="Précédent">
        ‹
      </Fleche>

      <Scene
        tabIndex={0}
        onKeyDown={surClavier}
        {...gestionnaires}
        role="group"
        aria-roledescription="carrousel"
        aria-label={`${indexActif + 1} sur ${total} : ${libelle(elements[indexActif])}`}
      >
        {elements.map((element, rang) => {
          const ecart = ecartCirculaire(rang - position, total);
          const auCentre = rang === rangAuCentre;
          return (
            <Diapo
              key={rang}
              $largeur={largeur}
              $auCentre={auCentre}
              $enMouvement={enMouvement}
              // Les cartes les plus éloignées sont cachées : c'est là qu'une carte passe
              // d'un côté à l'autre de la boucle, sans qu'on la voie traverser.
              $cachee={Math.abs(ecart) > CARTES_VISIBLES}
              style={{
                transform: placement(ecart),
                zIndex: Math.round(100 - Math.abs(ecart) * 10), // les plus proches passent devant
              }}
              onClick={auCentre ? undefined : () => aller(rang)}
              aria-hidden={!auCentre}
            >
              {rendu(element)}
            </Diapo>
          );
        })}
      </Scene>

      <Fleche type="button" onClick={() => aller(indexActif + 1)} aria-label="Suivant">
        ›
      </Fleche>
    </Cadre>
  );
}

const Cadre = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: ${({ theme }) => theme.espace(2)};
`;

// La scène donne la perspective ; les diapositives sont toutes posées au centre, puis décalées.
const Scene = styled.div`
  position: relative;
  height: 30rem;
  perspective: 1400px;
  overflow: hidden;
  cursor: grab;
  touch-action: pan-y; /* sur téléphone, le glisser vertical fait défiler la page */
  overscroll-behavior-x: contain; /* le pavé tactile ne déclenche pas « page précédente » */
  user-select: none;

  &:active {
    cursor: grabbing;
  }
  border-radius: ${({ theme }) => theme.rayons.lg};

  &:focus-visible {
    outline: ${({ theme }) => theme.bordures.contour};
    outline-offset: 4px;
  }
`;

const Diapo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${({ $largeur }) => $largeur};
  max-width: 80%;
  height: 27rem;
  margin-top: -13.5rem;
  margin-left: calc(${({ $largeur }) => $largeur} / -2);
  transform-style: preserve-3d;
  /* Pendant un glisser, les cartes suivent sans délai ; sinon elles glissent en douceur. */
  transition: ${({ $enMouvement }) =>
    $enMouvement
      ? 'opacity 300ms ease, filter 300ms ease'
      : 'transform 550ms cubic-bezier(0.32, 0.72, 0, 1), opacity 300ms ease, filter 300ms ease'};
  cursor: ${({ $auCentre }) => ($auCentre ? 'default' : 'pointer')};

  /* La carte remplit la diapositive. */
  & > * {
    height: 100%;
    box-shadow: ${({ theme }) => theme.ombres.douce};
  }

  ${({ $auCentre }) =>
    !$auCentre &&
    css`
      filter: brightness(0.92);
    `}

  ${({ $cachee }) =>
    $cachee &&
    css`
      opacity: 0;
      pointer-events: none;
    `}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Fleche = styled.button`
  width: 2.75rem;
  height: 2.75rem;
  border: ${({ theme }) => theme.bordures.contour};
  border-radius: ${({ theme }) => theme.rayons.rond};
  background: ${({ theme }) => theme.couleurs.surface};
  font-size: ${({ theme }) => theme.texte.xl};
  line-height: 1;

  &:hover {
    background: ${({ theme }) => theme.couleurs.gris100};
  }
`;

export default Carrousel;
