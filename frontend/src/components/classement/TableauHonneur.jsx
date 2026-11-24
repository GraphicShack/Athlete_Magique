// Responsabilité : le panneau des meilleurs scores, avec son filtre.

import Panneau from '@/components/commun/ui/Panneau.jsx';
import BarreChoix from '@/components/commun/ui/reglages/BarreChoix.jsx';
import MessageVide from '@/components/commun/ui/MessageVide.jsx';
import PetitBouton from '@/components/commun/ui/PetitBouton.jsx';
import { messageScores } from '@/utils/classement/messageScores.js';
import LigneScore from './LigneScore.jsx';
import { Tableau, Titre } from '@/components/commun/ui/Tableau.styles.js';
import { Filtre, Zone } from './TableauHonneur.styles.js';

// Les filtres (écrits comme le serveur les attend) pis leur nom affiché.
const FILTRES = { tous: 'Tous', comptes: 'Comptes', invites: 'Invités' };

// Affiche une ligne par score, ou un message s'il y en a pas.
// Props : scores (du meilleur au moins bon), etat ('chargement', 'pret' ou 'erreur'), filtre, onFiltrer, onReessayer.
function TableauHonneur({ scores, etat, filtre, onFiltrer, onReessayer }) {
  const message = messageScores(etat, scores.length);

  // Le filtre, à droite du titre.
  const barre = (
    <Filtre>
      <BarreChoix
        options={Object.keys(FILTRES)}
        libelle={(option) => FILTRES[option]}
        valeur={filtre}
        onChange={onFiltrer}
        aria-label="Filtrer les scores"
      />
    </Filtre>
  );

  return (
    <Panneau titre="Meilleurs scores" teinte="pointage" aside={barre} enEvidence>
      <Zone>
        {message && <MessageVide role="status">{message}</MessageVide>}
        {etat === 'erreur' && <PetitBouton onClick={onReessayer}>Réessayer</PetitBouton>}

        {!message && (
          <Tableau>
            <thead>
              <tr>
                <Titre $largeur="3.25rem">Rang</Titre>
                <Titre>Joueur</Titre>
                <Titre $largeur="8rem" $cacheSurCell>Type</Titre>
                <Titre $largeur="3.75rem" $droite>Score</Titre>
                <Titre $largeur="8rem" $droite $cacheSurCell>Date</Titre>
              </tr>
            </thead>
            <tbody>
              {scores.map((score) => (
                <LigneScore key={score.id} {...score} />
              ))}
            </tbody>
          </Tableau>
        )}
      </Zone>
    </Panneau>
  );
}

export default TableauHonneur;
