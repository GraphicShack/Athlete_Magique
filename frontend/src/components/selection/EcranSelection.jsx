// Responsabilité : le carrousel des persos tirés, qui choisit, pis le bouton Choisir.

import { useState } from 'react';
import Carrousel from '@/components/commun/ui/carrousel/Carrousel.jsx';
import Etiquette from '@/components/commun/ui/Etiquette.jsx';
import Confettis from '@/components/commun/ui/Confettis.jsx';
import Bouton from '@/components/commun/ui/Bouton.jsx';
import useDemande from '@/hooks/useDemande.js';
import { choisirPersonnage } from '@/services/serveur/selection.js';
import { lireSelection } from '@/utils/selection/lireSelection.js';
import { messageSelection, libelleChoisir, textePris } from '@/utils/selection/textesSelection.js';
import { texteNom } from '@/utils/textesJoueur.js';
import { CarteFlottante, Marque, Choix, Consigne, Barre, Resume } from './EcranSelection.styles.js';

// Props : selection (reçue du serveur, voir README).
function EcranSelection({ selection }) {
  const [indexActif, setIndexActif] = useState(0); // la carte au centre du carrousel
  const { enCours, erreur, faire } = useDemande(selection);

  const { course, joueurs } = selection;
  const { personnages, mesPersonnages, choisit, monTour } = lireSelection(selection);
  const auCentre = personnages[indexActif];

  return (
    <>
      <Consigne>
        Course {course.numero} sur {course.nombreCourses}. Ordre de choix : {joueurs.map(texteNom).join(', ')}.
      </Consigne>

      <Choix>
        <Carrousel
          elements={personnages}
          indexActif={indexActif}
          onChange={setIndexActif}
          libelle={(personnage) => personnage.nom}
          rendu={(personnage) => (
            // Seule la carte du centre flotte.
            <CarteFlottante
              personnage={personnage}
              format="portrait"
              $flotte={personnage.id === auCentre.id}
              $pris={personnage.prisPar && !personnage.choisiParMoi}
            >
              {personnage.prisPar && (
                <Marque>
                  <Etiquette>{textePris(personnage)}</Etiquette>
                </Marque>
              )}
            </CarteFlottante>
          )}
        />
        {/* Par-dessus le centre, où est la carte qu'on vient de choisir. */}
        <Confettis declencheur={mesPersonnages.at(-1)?.id} />
      </Choix>

      <Barre>
        <Resume aria-live="polite">
          {mesPersonnages.length > 0 && (
            <>
              Votre choix : <strong>{mesPersonnages.map(({ nom }) => nom).join(' et ')}</strong>.{' '}
            </>
          )}
          {erreur ?? messageSelection({ choisit, monTour })}
        </Resume>

        <Bouton
          onClick={() => faire(() => choisirPersonnage(auCentre.id))}
          disabled={!monTour || Boolean(auCentre.prisPar) || enCours}
        >
          {libelleChoisir(auCentre)}
        </Bouton>
      </Barre>
    </>
  );
}

export default EcranSelection;
