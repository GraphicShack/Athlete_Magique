// Responsabilité : le carrousel en coverflow (la carte du centre de face, les autres en perspective).
// Utilisé dans : SelectionPage

import useDefilement from '@/hooks/useDefilement.js';
import { modulo, ecartCirculaire, placement } from '@/utils/placement.js';
import { Cadre, Scene, Diapo, Fleche } from './Carrousel.styles.js';

const CARTES_VISIBLES = 4; // nombre de cartes affichées de chaque côté du centre

// Affiche les cartes en coverflow ; flèches, clic, glisser ou clavier changent la carte du centre.
// Props : elements (la liste), indexActif + onChange (la carte au centre), rendu (fonction qui dessine une carte), libelle (fonction qui donne son nom), largeur.
function Carrousel({ elements, indexActif, onChange, rendu, libelle, largeur = '17rem' }) {
  const total = elements.length;
  const { position, enMouvement, gestionnaires } = useDefilement({ indexActif, total, onChange });

  // Aller à une carte ; modulo fait boucler (avant la première : la dernière).
  const aller = (rang) => onChange(modulo(rang, total));
  // Carte la plus proche du centre en ce moment (même pendant un glisser).
  const rangAuCentre = modulo(Math.round(position), total);

  // Flèches gauche pis droite du clavier.
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
          // Distance de cette carte au centre, par le chemin le plus court sur la boucle.
          const ecart = ecartCirculaire(rang - position, total);
          const auCentre = rang === rangAuCentre;
          return (
            <Diapo
              key={rang}
              $largeur={largeur}
              $auCentre={auCentre}
              $enMouvement={enMouvement}
              // Les cartes les plus éloignées sont cachées : c'est là qu'une carte passe d'un côté à l'autre de la boucle, sans qu'on la voie traverser.
              $cachee={Math.abs(ecart) > CARTES_VISIBLES}
              style={{
                transform: placement(ecart),
                zIndex: Math.round(100 - Math.abs(ecart) * 10), // les plus proches passent devant
              }}
              onClick={auCentre ? undefined : () => aller(rang)} // clic sur une carte de côté : elle vient au centre
              aria-hidden={!auCentre} // les lecteurs d'écran ne lisent que la carte du centre
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

export default Carrousel;
