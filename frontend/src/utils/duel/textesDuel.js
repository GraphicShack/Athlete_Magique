// Responsabilité : les textes du duel (message pis boutons de chaque étape).

import { texteNom } from '@/utils/textesJoueur.js';

// Le résultat, ex. « Zoé gagne 4 contre 2 et avance de 2 cases. »
function texteResultat({ duelliste, cible, valeurs, gagnant }) {
  const [vainqueur, perdant] = gagnant === duelliste.id ? [duelliste, cible] : [cible, duelliste];
  const [haut, bas] = [valeurs[vainqueur.id], valeurs[perdant.id]];
  if (haut === bas) return `Égalité ! ${texteNom(vainqueur)} gagne et avance de 2 cases.`;
  return `${texteNom(vainqueur)} gagne ${haut} contre ${bas} et avance de 2 cases.`;
}

// Le message de chaque étape.
const MESSAGES = {
  question: ({ cible }) =>
    `${texteNom(cible)} est sur ta case. Veux-tu déclarer un duel ? Le plus haut dé avance de 2 cases. Tu gagnes les égalités.`,
  des: () => 'Les dés roulent…',
  resultat: texteResultat,
};

// Les boutons de chaque étape.
const BOUTONS = {
  question: [
    { id: 'accepter', libelle: 'Déclarer le duel', principal: true },
    { id: 'fermer', libelle: 'Passer' },
  ],
  des: [],
  resultat: [{ id: 'fermer', libelle: 'Continuer', principal: true }],
};

// duel : avec duelliste pis cible (les joueurs au complet).
export const messageDuel = (etape, duel) => MESSAGES[etape](duel);
export const boutonsDuel = (etape) => BOUTONS[etape];
