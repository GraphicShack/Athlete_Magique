// Responsabilité : le carrousel en coverflow (la carte du centre de face, les autres en perspective).
// Inspiration : l'exemple « Coverflow » de Motion (motion.dev), https://images.motion.dev/examples/stage/react/gallery-odd-lights-coverflow/v-07b8c907e0fa/stage.mp4 (refait en CSS, sans la librairie).

import useDefilement from '@/hooks/useDefilement.js';
import { modulo, placement } from '@/utils/placement.js';
import { Cadre, Scene, Diapo, Fleche } from './Carrousel.styles.js';

const CARTES_VISIBLES = 4; // nombre maximum de cartes affichées de chaque côté du centre

// Affiche les cartes en coverflow ; flèches, clic, glisser ou clavier changent la carte du centre.
// Props : elements (la liste), indexActif + onChange (la carte au centre), rendu (fonction qui dessine une carte), libelle (fonction qui donne son nom), largeur.
function Carrousel({ elements, indexActif, onChange, rendu, libelle, largeur = '17rem' }) {
  const total = elements.length;
  const { position, enMouvement, aller, gestionnaires } = useDefilement({ indexActif, total, onChange });

  // Autant de cartes à gauche qu'à droite. Avec un nombre pair, celle d'en face est donc dessinée 2 fois, une de chaque côté.
  const parCote = Math.min(CARTES_VISIBLES, Math.floor(total / 2));

  // Les places à dessiner, autour du centre (+ 1 cachée de chaque côté, pour qu'elle apparaisse en douceur).
  // La place 7 d'une liste de 6 montre la carte 1 : la boucle se répète sans fin.
  const centre = Math.round(position); // la place la plus proche du centre (même pendant un glisser)
  const places = Array.from({ length: 2 * (parCote + 1) + 1 }, (_, i) => centre - parCote - 1 + i);

  // Flèches gauche pis droite du clavier.
  function surClavier(evenement) {
    if (evenement.key === 'ArrowLeft') aller(centre - 1);
    if (evenement.key === 'ArrowRight') aller(centre + 1);
  }

  return (
    <Cadre>
      <Fleche type="button" onClick={() => aller(centre - 1)} aria-label="Précédent">
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
        {places.map((place) => {
          const ecart = place - position; // distance au centre
          const auCentre = place === centre;
          return (
            <Diapo
              key={place}
              $largeur={largeur}
              $auCentre={auCentre}
              $enMouvement={enMouvement}
              $cachee={Math.abs(ecart) > parCote}
              style={{
                transform: placement(ecart),
                zIndex: Math.round(100 - Math.abs(ecart) * 10), // les plus proches passent devant
              }}
              onClick={auCentre ? undefined : () => aller(place)} // clic sur une carte de côté : elle vient au centre
              aria-hidden={!auCentre} // les lecteurs d'écran ne lisent que la carte du centre
            >
              {rendu(elements[modulo(place, total)])}
            </Diapo>
          );
        })}
      </Scene>

      <Fleche type="button" onClick={() => aller(centre + 1)} aria-label="Suivant">
        ›
      </Fleche>
    </Cadre>
  );
}

export default Carrousel;
