// Responsabilité : des événements de journal inventés, au format standard (en attendant le serveur).
// Utilisé dans : simulationJournal

const EVENEMENTS_EXEMPLE = [
  {
    id: 'e1', course: 2, tour: 1, etape: 'debut', type: 'COURSE_DEBUT',
    acteur: null, cible: null, cause: null, details: { numero: 2 },
  },
  {
    id: 'e2', course: 2, tour: 4, etape: 'deplacement', type: 'DEPLACEMENT',
    acteur: 'j1', cible: null, cause: { genre: 'de' }, details: { de: 7, a: 12, cases: 5 },
  },
  {
    id: 'e3', course: 2, tour: 4, etape: 'deplacement', type: 'DEPLACEMENT',
    acteur: 'j2', cible: null, cause: { genre: 'pouvoir', id: 'lievre' }, details: { de: 11, a: 17, cases: 6 },
  },
  {
    id: 'e4', course: 2, tour: 4, etape: 'fin', type: 'TREBUCHE',
    acteur: 'j3', cible: null, cause: { genre: 'case', id: 'rocher' }, details: { case: 13 },
  },
  {
    id: 'e5', course: 2, tour: 4, etape: 'deplacement', type: 'DEPLACEMENT',
    acteur: 'j4', cible: null, cause: { genre: 'de' }, details: { de: 3, a: 6, cases: 3 },
  },
];

export default EVENEMENTS_EXEMPLE;
