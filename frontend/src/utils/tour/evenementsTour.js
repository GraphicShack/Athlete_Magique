// Responsabilité : crée les événements du journal pour le tour.
// Utilisé dans : actionsTour

// Ce qui est commun à tous les événements d'un tour : la course, le tour, le joueur, l'étape.
const base = (tour, etape) => ({ course: tour.numeroCourse, tour: tour.numero, etape, acteur: tour.idJoueur });

// Le début pis la fin du tour du joueur.
export const evenementDebutTour = (tour) => ({ ...base(tour, 'debut'), type: 'TOUR_DEBUT' });
// L'événement de fin du tour.
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

// L'événement d'un bouton du tour (voir « journal » dans data/exemples/deroulementTour.js).
export const evenementBouton = (tour, { etape, type, parPouvoir = false, details = {} }) => ({
  ...base(tour, etape),
  type,
  cause: parPouvoir ? { genre: 'pouvoir', id: tour.personnage.id } : null,
  details,
});
