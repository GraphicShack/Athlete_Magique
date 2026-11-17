/*
 * evenementsExemple.js : les événements d'exemple du journal, dans le format standard,
 * en attendant ceux du serveur.
 *
 * Responsabilité : fournir des événements réalistes, cohérents avec data/exemples/partieExemple.js.
 * Seul le service partie.js lit ce fichier.
 *
 * FORMAT STANDARD D'UN ÉVÉNEMENT (le même que celui attendu du serveur) :
 *   {
 *     id      : 'e12'        unique et croissant (sert aussi à garder l'ordre)
 *     course  : 2            numéro de la course
 *     tour    : 5            numéro du tour
 *     etape   : 'debut' | 'lancer' | 'deplacement' | 'fin'   (les 4 étapes du tour)
 *     type    : 'TREBUCHE'   un des types de utils/journal/phrasesJournal.js
 *     acteur  : 'j3'         id du joueur concerné (jamais son nom), ou null
 *     cible   : 'j1'         id d'un 2e joueur (échange, duel, élimination…), ou null
 *     cause   : { genre: 'de' | 'case' | 'pouvoir' | 'regle', id: 'rocher' }   pourquoi, ou null
 *     details : { … }        ce qui dépend du type (voir utils/journal/phrasesJournal.js)
 *   }
 *
 * Le serveur envoie des données, pas des phrases : c'est le frontend qui écrit le texte.
 * Les événements sont ici du plus ancien au plus récent, comme le serveur les enverrait.
 */
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
