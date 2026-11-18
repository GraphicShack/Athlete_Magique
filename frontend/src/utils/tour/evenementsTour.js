/*
 * evenementsTour.js : crée les événements du journal pour le tour en cours.
 *
 * Responsabilité unique : construire chaque événement au format standard
 * (voir data/exemples/evenementsExemple.js). Il ne l'envoie pas (voir journaliser dans
 * services/journal/journal.js) et n'écrit pas la phrase (voir utils/journal/texteEvenement.js).
 *
 * Fonctions pures : elles reçoivent le tour ({ numeroCourse, numero, idJoueur, personnage }) et les valeurs
 * utiles, et renvoient un objet.
 */

// Ce qui est commun à tous les événements d'un tour : la course, le tour, le joueur, l'étape.
const base = (tour, etape) => ({ course: tour.numeroCourse, tour: tour.numero, etape, acteur: tour.idJoueur });

// Le début et la fin du tour du joueur.
export const evenementDebutTour = (tour) => ({ ...base(tour, 'debut'), type: 'TOUR_DEBUT' });
export const evenementFinTour = (tour) => ({ ...base(tour, 'fin'), type: 'TOUR_FIN' });

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
  cause: { genre: 'pouvoir', id: tour.personnage.id },
  details: { valeur, relance, maximum },
});

/**
 * L'événement d'un bouton du tour (voir « journal » dans data/exemples/deroulementTour.js).
 *   etape      : 'debut', 'lancer', 'deplacement' ou 'fin'
 *   type       : ex. 'HYPNOSE', 'DE_GARDE', 'DEPLACEMENT'
 *   parPouvoir : true si c'est le pouvoir du personnage qui le cause
 *   details    : les détails du type (ex. { valeur }, { de, a, cases })
 */
export const evenementBouton = (tour, { etape, type, parPouvoir = false, details = {} }) => ({
  ...base(tour, etape),
  type,
  cause: parPouvoir ? { genre: 'pouvoir', id: tour.personnage.id } : null,
  details,
});
