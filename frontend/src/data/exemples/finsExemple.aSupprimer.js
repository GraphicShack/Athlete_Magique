// Responsabilité : la fin des 3 courses, inventée, écrite comme le serveur l'enverra.

// joueurs : dans l'ordre du classement général.
//   numero       : sa place dans le salon (1 à 4), pour sa couleur
//   place        : 1, 2, ou null s'il n'a pas franchi la ligne
//   pointsCourse : gagnés avec sa place ; etoiles : gagnés sur les cases Étoile (pendant cette course)
//   victoires pis total : depuis le début de la partie
// ordreChoix : les noms, dans l'ordre où ils choisiront leur prochain perso.
const FINS_EXEMPLE = [
  {
    numero: 1,
    nombreCourses: 3,
    joueurs: [
      { id: 'j2', numero: 2, nom: 'Angie', bot: false, idPersonnage: 'lievre', place: 1, pointsCourse: 3, etoiles: 1, victoires: 1, total: 4, rang: 1 },
      { id: 'j1', numero: 1, nom: 'Félix', bot: false, idPersonnage: 'magicien', place: 2, pointsCourse: 1, etoiles: 0, victoires: 0, total: 1, rang: 2 },
      { id: 'j3', numero: 3, nom: 'Alec', bot: false, idPersonnage: 'centaure', place: null, pointsCourse: 0, etoiles: 0, victoires: 0, total: 0, rang: 3 },
      { id: 'j4', numero: 4, nom: 'Alexis (GOAT)', bot: false, idPersonnage: 'banana', place: null, pointsCourse: 0, etoiles: 0, victoires: 0, total: 0, rang: 3 },
    ],
    ordreChoix: ['Alexis (GOAT)', 'Alec', 'Félix', 'Angie'],
  },
  {
    numero: 2,
    nombreCourses: 3,
    joueurs: [
      { id: 'j1', numero: 1, nom: 'Félix', bot: false, idPersonnage: 'duelliste', place: 1, pointsCourse: 4, etoiles: 0, victoires: 1, total: 5, rang: 1 },
      { id: 'j2', numero: 2, nom: 'Angie', bot: false, idPersonnage: 'flipflop', place: null, pointsCourse: 0, etoiles: 0, victoires: 1, total: 4, rang: 2 },
      { id: 'j3', numero: 3, nom: 'Alec', bot: false, idPersonnage: 'hypnotiste', place: 2, pointsCourse: 2, etoiles: 1, victoires: 0, total: 3, rang: 3 },
      { id: 'j4', numero: 4, nom: 'Alexis (GOAT)', bot: false, idPersonnage: 'bouche', place: null, pointsCourse: 0, etoiles: 1, victoires: 0, total: 1, rang: 4 },
    ],
    ordreChoix: ['Alexis (GOAT)', 'Alec', 'Angie', 'Félix'],
  },
  {
    numero: 3,
    nombreCourses: 3,
    joueurs: [
      { id: 'j2', numero: 2, nom: 'Angie', bot: false, idPersonnage: 'partyanimal', place: 2, pointsCourse: 3, etoiles: 0, victoires: 1, total: 7, rang: 1 },
      { id: 'j1', numero: 1, nom: 'Félix', bot: false, idPersonnage: 'scientifique', place: null, pointsCourse: 0, etoiles: 1, victoires: 1, total: 6, rang: 2 },
      { id: 'j4', numero: 4, nom: 'Alexis (GOAT)', bot: false, idPersonnage: 'magicien', place: 1, pointsCourse: 5, etoiles: 0, victoires: 1, total: 6, rang: 2 },
      { id: 'j3', numero: 3, nom: 'Alec', bot: false, idPersonnage: 'banana', place: null, pointsCourse: 0, etoiles: 0, victoires: 0, total: 3, rang: 4 },
    ],
    ordreChoix: [],
  },
];

export default FINS_EXEMPLE;
