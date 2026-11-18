// Responsabilité : l'état du tour pis toutes les façons dont il change (une fonction par action).
// Utilisé dans : useTourDemo

import { evenementBouton, evenementDebutTour, evenementFinTour, evenementLancer, evenementRelance } from '@/utils/tour/evenementsTour.js';

// L'état du tour au départ. Tout le tour tient dans cet objet-là.
export const ETAT_DEPART = {
  etape: 'debut', // 'debut', 'lancer', 'deplacement', 'fin' ou 'termine'
  valeurDe: null, // la face du dé
  lancers: 0, // nb de lancers faits (sert aussi à relancer l'anim du dé)
  roule: false, // true pendant que le dé roule
  cases: null, // nb de cases à avancer, une fois le résultat gardé
  avance: 0, // cases déjà avancées par le pion
};

// Chaque action reçoit l'état pis renvoie le NOUVEL état + les événements à mettre au journal.
// Elle change rien elle-même (fonction pure) : c'est useTourDemo qui applique le résultat.

// L'événement du bouton pour le journal, s'il en a un (option « journal » dans les données).
function evenementsDuBouton(tour, bouton, etape, details) {
  if (!bouton.journal) return [];
  return [evenementBouton(tour, { etape, type: bouton.journal, parPouvoir: bouton.parPouvoir, details })];
}

export const ACTIONS = {
  // Le tour commence (avec ou sans pouvoir) ; on passe au lancer du dé.
  commencer: (etat, { tour, bouton }) => ({
    etat: { ...etat, etape: 'lancer' },
    evenements: [evenementDebutTour(tour), ...evenementsDuBouton(tour, bouton, 'debut')],
  }),

  // Le dé part à rouler ; son résultat va au journal seulement quand il s'arrête (voir arreterDe).
  lancer: (etat, { nouveauDe }) => ({
    etat: { ...etat, valeurDe: nouveauDe, lancers: etat.lancers + 1, roule: true },
    evenements: [],
  }),

  // Garde le résultat du dé (× 2 pour le Scientifique) pis passe au déplacement.
  fixer: (etat, { tour, bouton }) => {
    const cases = etat.valeurDe * (bouton.multiplicateur ?? 1);
    return {
      etat: { ...etat, cases, etape: 'deplacement' },
      evenements: evenementsDuBouton(tour, bouton, 'lancer', { valeur: etat.valeurDe, cases }),
    };
  },

  // Saute le lancer pis le déplacement (ex. le Flip Flop qui échange sa place).
  allerALaFin: (etat, { tour, bouton }) => ({
    etat: { ...etat, etape: 'fin' },
    evenements: evenementsDuBouton(tour, bouton, 'lancer'),
  }),

  // Le pion avance du résultat (+ le bonus, ex. Lièvre +2) ; on passe à la fin du tour.
  avancer: (etat, { tour, bouton }) => {
    const cases = etat.cases + (bouton.bonus ?? 0);
    return {
      etat: { ...etat, avance: cases, etape: 'fin' },
      evenements: evenementsDuBouton(tour, bouton, 'deplacement', { de: tour.position, a: tour.position + cases, cases }),
    };
  },

  // Le joueur termine son tour.
  terminer: (etat, { tour }) => ({
    etat: { ...etat, etape: 'termine' },
    evenements: [evenementFinTour(tour)],
  }),
};

// Le dé vient de s'arrêter : on met son résultat au journal, pis on passe au déplacement
// s'il reste aucun choix à faire (pas de pouvoir après le lancer, ou plus de relance).
export function arreterDe(etat, tour) {
  if (!etat.roule) return { etat, evenements: [] }; // déjà arrêté : on fait rien

  const { apresLancer, relancesMax } = tour.etapes.lancer;
  const relances = etat.lancers - 1; // le 1er lancer compte pas comme une relance
  const evenement =
    relances > 0
      ? evenementRelance(tour, { valeur: etat.valeurDe, relance: relances, maximum: relancesMax })
      : evenementLancer(tour, etat.valeurDe);
  const plusDeChoix = apresLancer.length === 0 || relances >= relancesMax;

  return {
    etat: plusDeChoix ? { ...etat, roule: false, cases: etat.valeurDe, etape: 'deplacement' } : { ...etat, roule: false },
    evenements: [evenement],
  };
}
