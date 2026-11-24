// Responsabilité : pour chaque étape du tour, son numéro, son titre, ses boutons pis son message.

import { nombreDeCases } from '@/utils/nombreDeCases.js';

// Les boutons de l'étape du lancer : ceux d'avant le lancer, ou ceux d'après (ex. Relancer / Garder).
// Pendant le 1er lancer, on garde ceux d'avant (grisés) pour pas que les boutons sautent.
function boutonsDuLancer(tour, etat) {
  const { avantLancer, apresLancer } = tour.etapes.lancer;
  const premierLancer = etat.lancers === 0 || (etat.lancers === 1 && etat.roule);
  return premierLancer ? avantLancer : apresLancer;
}

// Le message de l'étape du lancer : la consigne, « Le dé roule… », ou le résultat.
function messageDuLancer(tour, etat) {
  const { consigneAvant, consigneApres } = tour.etapes.lancer;
  if (etat.roule) return 'Le dé roule…';
  if (etat.lancers === 0) return consigneAvant;
  return `${tour.joueur} a obtenu ${etat.valeurDe}. ${consigneApres}`;
}

// Une entrée par étape. « boutons » pis « message » sont des fonctions qui reçoivent le tour pis l'état.
export const ETAPES = {
  debut: {
    numero: 1,
    titre: 'Début du tour',
    boutons: (tour) => tour.etapes.debut.boutons,
    message: (tour) => tour.etapes.debut.consigne,
  },
  lancer: {
    numero: 2,
    titre: 'Lancer de dé',
    boutons: boutonsDuLancer,
    message: messageDuLancer,
  },
  deplacement: {
    numero: 3,
    titre: 'Déplacement',
    boutons: (tour) => tour.etapes.deplacement.boutons,
    message: (tour, etat) => `${tour.joueur} va avancer de ${nombreDeCases(etat.cases)}. ${tour.etapes.deplacement.consigne}`,
  },
  fin: {
    numero: 4,
    titre: 'Fin du tour',
    boutons: (tour) => tour.etapes.fin.boutons,
    message: (tour) => tour.etapes.fin.consigne,
  },
  termine: {
    numero: 4,
    titre: 'Fin du tour',
    boutons: () => [],
    message: (tour) => `Le tour de ${tour.joueur} est terminé.`,
  },
};
