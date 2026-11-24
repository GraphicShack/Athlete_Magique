// Responsabilité : une course inventée pour tester l'écran de course.

// Les joueurs sont dans l'ordre de jeu. numero : sa place dans le salon (pour sa couleur).
// position : 0 = Départ, 1 à 30 = cases. etat : null, 'tombe' ou 'elimine'.
const PARTIE_EXEMPLE = {
  idMoi: 'j1',
  idActif: 'j1',
  duel: null,
  rochers: [7, 13, 22],
  joueurs: [
    { id: 'j1', numero: 1, nom: 'Félix', bot: false, idPersonnage: 'magicien', position: 12, etat: null, points: 0 },
    { id: 'j2', numero: 2, nom: 'Angie', bot: false, idPersonnage: 'lievre', position: 17, etat: null, points: 1 },
    { id: 'j3', numero: 3, nom: 'Alec', bot: false, idPersonnage: 'centaure', position: 13, etat: 'tombe', points: 0 },
    { id: 'j4', numero: 4, nom: 'Bot 1', bot: true, idPersonnage: 'banana', position: 6, etat: null, points: 0 },
  ],
  // Les événements du tour 4, du plus ancien au plus récent.
  journal: [
    { id: 'e1', course: 1, tour: 4, etape: 'deplacement', type: 'DEPLACEMENT', acteur: 'j1', cible: null, cause: { genre: 'de' }, details: { de: 7, a: 12, cases: 5 } },
    { id: 'e2', course: 1, tour: 4, etape: 'deplacement', type: 'DEPLACEMENT', acteur: 'j2', cible: null, cause: { genre: 'pouvoir', id: 'lievre' }, details: { de: 11, a: 17, cases: 6 } },
    { id: 'e3', course: 1, tour: 4, etape: 'fin', type: 'TREBUCHE', acteur: 'j3', cible: null, cause: { genre: 'case', id: 'rocher' }, details: { case: 13 } },
  ],
};

export default PARTIE_EXEMPLE;
