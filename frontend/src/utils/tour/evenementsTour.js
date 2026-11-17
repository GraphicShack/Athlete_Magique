/*
 * evenementsTour.js : crée les événements du journal pour les actions du tour en cours
 * (pouvoirs de début de tour, lancer, relancer, garder, doubler, échanger, déplacement avec pouvoir).
 *
 * Responsabilité unique : construire chaque événement au format standard
 * (voir data/exemples/evenementsExemple.js). Il ne l’envoie pas (voir journaliser dans services/journal/journal.js)
 * et n’écrit pas la phrase (voir utils/journal/texteEvenement.js).
 *
 * Fonctions pures : elles reçoivent le tour ({ numero, idJoueur, position, personnage })
 * et les valeurs utiles, et renvoient un objet.
 */

// Ce qui est commun à tous les événements d'un tour : le tour, le joueur, l'étape.
const base = (tour, etape) => ({ tour: tour.numero, etape, acteur: tour.idJoueur });

// La cause « pouvoir du personnage actif » (ex. Magicien qui relance).
const parPouvoir = (tour) => ({ genre: 'pouvoir', id: tour.personnage.id });

// Le début du tour du joueur.
export const evenementDebutTour = (tour) => ({ ...base(tour, 'debut'), type: 'TOUR_DEBUT' });

// La fin du tour du joueur.
export const evenementFinTour = (tour) => ({ ...base(tour, 'fin'), type: 'TOUR_FIN' });

// Hypnotiste : il va téléporter un personnage sur sa case.
export const evenementHypnose = (tour) => ({
  ...base(tour, 'debut'),
  type: 'HYPNOSE',
  cause: parPouvoir(tour),
});

// Party Animal : les autres personnages se rapprochent de 1 case.
export const evenementRassemblement = (tour) => ({
  ...base(tour, 'debut'),
  type: 'RASSEMBLEMENT',
  cause: parPouvoir(tour),
});

// Le premier lancer du dé.
export const evenementLancer = (tour, valeur) => ({
  ...base(tour, 'lancer'),
  type: 'DE_LANCE',
  cause: { genre: 'de' },
  details: { valeur },
});

// Une relance (ex. Magicien) : relance 1 sur 2, 2 sur 2.
export const evenementRelance = (tour, { valeur, relance, maximum }) => ({
  ...base(tour, 'lancer'),
  type: 'DE_RELANCE',
  cause: parPouvoir(tour),
  details: { valeur, relance, maximum },
});

// Le joueur garde son résultat.
export const evenementGarder = (tour, valeur) => ({
  ...base(tour, 'lancer'),
  type: 'DE_GARDE',
  details: { valeur },
});

// Le Scientifique Fusé double son déplacement.
export const evenementDoubler = (tour, cases) => ({
  ...base(tour, 'lancer'),
  type: 'DEPLACEMENT_DOUBLE',
  cause: parPouvoir(tour),
  details: { cases },
});

// Le Flip Flop renonce au dé pour échanger sa place.
export const evenementEchanger = (tour) => ({
  ...base(tour, 'lancer'),
  type: 'ECHANGE_DEMANDE',
  cause: parPouvoir(tour),
});

// Le déplacement principal avec un pouvoir (ex. Lièvre +2, Centaure) : de la position actuelle,
// de « cases » cases. Un déplacement sans pouvoir n'est pas journalisé.
export const evenementDeplacementPouvoir = (tour, cases) => ({
  ...base(tour, 'deplacement'),
  type: 'DEPLACEMENT',
  cause: parPouvoir(tour),
  details: { de: tour.position, a: tour.position + cases, cases },
});
