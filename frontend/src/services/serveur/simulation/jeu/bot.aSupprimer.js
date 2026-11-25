// Responsabilité : choisit l'action d'un joueur qui joue tout seul (des choix simples).

import { actif, trouver } from './etat.aSupprimer.js';

// Celui qui est le plus loin devant, pis de combien de cases.
function leader(partie, cibles) {
  const [premier] = cibles.map((id) => trouver(partie, id)).sort((a, b) => b.position - a.position);
  return { id: premier.id, avance: premier.position - actif(partie).position };
}

// Pour les actions qui demandent réflexion : est-ce que ça vaut la peine ?
const VAUT_LA_PEINE = {
  HYPNOTISER: (partie, { ciblesPossibles }) => leader(partie, ciblesPossibles).avance > 3,
  ECHANGER: (partie, { ciblesPossibles }) => leader(partie, ciblesPossibles).avance > 5,
  RELANCER: ({ tour }) => tour.de.valeur <= 3,
  DOUBLER: ({ tour }) => tour.de.valeur >= 4,
};

// Renvoie { type, cible } : une action qui vaut la peine, sinon la plus ordinaire.
export function choisirAction(partie) {
  const { actions } = partie.tour;
  const bonne = actions.find((action) => VAUT_LA_PEINE[action.type]?.(partie, action));
  const choisie = bonne ?? actions.find(({ type }) => !VAUT_LA_PEINE[type]);
  return { type: choisie.type, cible: choisie.ciblesPossibles && leader(partie, choisie.ciblesPossibles).id };
}
