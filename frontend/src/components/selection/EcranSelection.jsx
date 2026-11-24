// Responsabilité : le carrousel des persos tirés, qui choisit, pis le bouton Choisir.

import { useEffect, useState } from 'react';
import Carrousel from '@/components/commun/ui/carrousel/Carrousel.jsx';
import Etiquette from '@/components/commun/ui/Etiquette.jsx';
import Confettis from '@/components/commun/ui/Confettis.jsx';
import Bouton from '@/components/commun/ui/Bouton.jsx';
import useDemande from '@/hooks/useDemande.js';
import { choisirPersonnage } from '@/services/serveur/selection.js';
import { lireSelection } from '@/utils/selection/lireSelection.js';
import { messageSelection, libelleChoisir, textePris } from '@/utils/selection/textesSelection.js';
import { texteNom } from '@/utils/textesJoueur.js';
import { CarteFlottante, Marque, Consigne, Barre, Resume } from './EcranSelection.styles.js';

// Props : selection (reçue du serveur, voir README).
function EcranSelection({ selection }) {
  const [indexActif, setIndexActif] = useState(0); // la carte au centre du carrousel
  const { enCours, erreur, faire, effacer } = useDemande();

  const { idMoi, course, joueurs } = selection;
  const { personnages, mesPersonnages, choisit, aMoi } = lireSelection(selection);
  const auCentre = personnages[indexActif];

  // La sélection a changé : l'ancien refus est plus bon.
  useEffect(effacer, [selection]);

  return (
    <>
      <Consigne>
        Course {course.numero} sur {course.nombreCourses}. Ordre de choix : {joueurs.map(texteNom).join(', ')}.
      </Consigne>

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
            $pris={Boolean(personnage.prisPar) && personnage.prisPar.id !== idMoi}
          >
            {personnage.prisPar && (
              <Marque>
                <Etiquette>{textePris(personnage.prisPar, idMoi)}</Etiquette>
              </Marque>
            )}
            {personnage.prisPar?.id === idMoi && <Confettis declencheur={personnage.id} />}
          </CarteFlottante>
        )}
      />

      <Barre>
        <Resume aria-live="polite">
          {mesPersonnages.length > 0 && (
            <>
              Votre choix : <strong>{mesPersonnages.map(({ nom }) => nom).join(' et ')}</strong>.{' '}
            </>
          )}
          {erreur ?? messageSelection({ choisit, aMoi })}
        </Resume>

        <Bouton
          onClick={() => faire(() => choisirPersonnage(auCentre.id))}
          disabled={!aMoi || Boolean(auCentre.prisPar) || enCours}
        >
          {libelleChoisir(auCentre)}
        </Bouton>
      </Barre>
    </>
  );
}

export default EcranSelection;
