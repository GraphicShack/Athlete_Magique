// Responsabilité : les textes de mon tour (étapes, boutons, message).

import { nombreDeCases } from '@/utils/nombreDeCases.js';

// Le numéro pis le titre de chaque étape, dans l'ordre.
export const ETAPES = {
  debut: { numero: 1, titre: 'Début du tour' },
  lancer: { numero: 2, titre: 'Lancer du dé' },
  deplacement: { numero: 3, titre: 'Déplacement principal' },
  fin: { numero: 4, titre: 'Fin du tour' },
};

// Une étape inconnue montre son nom, au lieu de planter.
export function infosEtape(etape) {
  return ETAPES[etape] ?? { numero: 0, titre: etape };
}

// Le texte du bouton de chaque action permise par le serveur.
const LIBELLES = {
  COMMENCER: () => 'Commencer le tour',
  HYPNOTISER: () => 'Téléporter un personnage',
  PASSER_POUVOIR: () => 'Ne pas l’utiliser',
  RASSEMBLER: () => 'Rassembler les personnages',
  LANCER: () => 'Lancer le dé',
  RELANCER: ({ relance, relancesMax }) => `Relancer le dé (${relance} sur ${relancesMax})`,
  GARDER: (action, { de }) => `Garder le ${de.valeur}`,
  DOUBLER: () => 'Doubler et trébucher',
  ECHANGER: () => 'Échanger de place',
  AVANCER: (action, { cases, pouvoirActif }) => (pouvoirActif ? `Avancer de ${cases}` : `Confirmer : avancer de ${cases}`),
  FINIR_TOUR: () => 'Fin du tour',
};

// Une action inconnue montre son type, au lieu de planter.
export function libelleAction(action, tour) {
  return LIBELLES[action.type]?.(action, tour) ?? action.type;
}

// Le message à côté du dé (rien pour une étape inconnue).
export function messageTour({ tour, joueur, roule }) {
  if (roule) return 'Le dé roule…';
  if (tour.etape === 'debut') return 'C’est ton tour. Commence quand tu es prêt.';
  if (tour.etape === 'lancer' && tour.de.valeur === null) return 'Lance le dé pour avancer.';
  if (tour.etape === 'lancer') return `${joueur.nom} a obtenu ${tour.de.valeur}. À toi de choisir.`;
  if (tour.etape === 'deplacement') return `${joueur.nom} va avancer de ${nombreDeCases(tour.cases)}.`;
  if (tour.etape === 'fin') return 'Termine ton tour.';
  return '';
}
