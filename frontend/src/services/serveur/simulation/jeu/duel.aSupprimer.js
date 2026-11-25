// Responsabilité : les duels (les proposer, répondre, donner le résultat).

import { enCourse, lancerUnDe, noter, parPouvoir, trouver, voisins } from './etat.aSupprimer.js';
import { deplacer } from './deplacement.aSupprimer.js';

// Ouvre le prochain duel en attente (s'ils partagent encore leur case).
function ouvrirProchain(partie) {
  const [prochain, ...reste] = partie.duelsEnAttente;
  if (!prochain || partie.finie) return { ...partie, duel: null, duelsEnAttente: [] };

  const { idDuelliste, idCible } = prochain;
  const suite = { ...partie, duelsEnAttente: reste };
  const valide = enCourse(trouver(partie, idDuelliste)) && voisins(partie, idDuelliste).some(({ id }) => id === idCible);
  if (!valide) return ouvrirProchain(suite);

  const nombreDuels = partie.nombreDuels + 1;
  return { ...suite, nombreDuels, duel: { id: `d${nombreDuels}`, idDuelliste, idCible, valeurs: null, gagnant: null } };
}

// Après une action : un duel par perso qui partage la case du Duelliste, si l'un des deux vient de bouger.
export function proposerDuels(partie) {
  const duelliste = partie.joueurs.find(({ idPersonnage }) => idPersonnage === 'duelliste');
  const adversaires = duelliste && enCourse(duelliste) ? voisins(partie, duelliste.id) : [];
  const duels = adversaires
    .filter(({ id }) => partie.bouges.includes(id) || partie.bouges.includes(duelliste.id))
    .map(({ id }) => ({ idDuelliste: duelliste.id, idCible: id }));

  // Ceux qui attendaient déjà passent en premier (ouvrirProchain enlève ceux qui sont plus possibles).
  return ouvrirProchain({ ...partie, bouges: [], duelsEnAttente: [...partie.duelsEnAttente, ...duels] });
}

// La réponse du Duelliste : on passe au suivant, ou on lance les 2 dés (il gagne les égalités).
export function repondreAuDuel(partie, accepter) {
  if (!partie.duel || partie.duel.valeurs) throw new Error("Il n'y a pas de duel à décider.");
  const { idDuelliste, idCible } = partie.duel;
  const adversaires = { acteur: idDuelliste, cible: idCible };
  if (!accepter) return ouvrirProchain(noter(partie, 'DUEL_PASSE', adversaires));

  const notee = noter(partie, 'DUEL_DECLARE', { ...adversaires, cause: parPouvoir('duelliste') });
  const valeurs = { [idDuelliste]: lancerUnDe(), [idCible]: lancerUnDe() };
  const gagnant = valeurs[idDuelliste] >= valeurs[idCible] ? idDuelliste : idCible;
  return { ...notee, duel: { ...partie.duel, valeurs, gagnant } };
}

// Le gagnant avance de 2 cases.
export function finirDuel(partie) {
  const { idDuelliste, idCible, valeurs, gagnant } = partie.duel;
  const details = {
    valeurActeur: valeurs[idDuelliste],
    valeurCible: valeurs[idCible],
    gagnant: gagnant === idDuelliste ? 'acteur' : 'cible',
  };
  const notee = noter({ ...partie, duel: null }, 'DUEL', {
    acteur: idDuelliste,
    cible: idCible,
    cause: parPouvoir('duelliste'),
    details,
  });
  return deplacer(notee, gagnant, 2, { cause: parPouvoir('duelliste'), muet: true });
}
