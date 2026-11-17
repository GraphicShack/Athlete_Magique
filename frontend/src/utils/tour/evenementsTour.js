/*
 * evenementsTour.js : crée les événements du journal pour les actions du tour en cours
 * (lancer, relancer, garder, doubler, échanger, avancer).
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

// Le déplacement principal : de la position actuelle, de « cases » cases.
export const evenementAvancer = (tour, cases) => ({
  ...base(tour, 'deplacement'),
  type: 'DEPLACEMENT',
  cause: { genre: 'de' },
  details: { de: tour.position, a: tour.position + cases, cases },
});
