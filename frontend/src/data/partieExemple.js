/*
 * partieExemple.js : une course en cours, inventée pour essayer l'écran de course
 * avant que le serveur et le moteur de jeu existent.
 *
 * Responsabilité : fournir des valeurs d'exemple réalistes et cohérentes entre elles
 * (positions, journal, tour en cours). Rien n'est calculé ici.
 *
 * Seuls les services (dossier services/) lisent ce fichier : les composants passent par eux.
 * Les personnages sont donnés par leur id ; le service les remplace par le personnage complet.
 *
 * Le moment choisi : course 2 sur 3, Félix (Magicien) vient de lancer le dé et obtient 2.
 * Il peut garder ce résultat ou relancer grâce à son pouvoir.
 */
const PARTIE_EXEMPLE = {
  course: { numero: 2, nombreCourses: 3 },

  // Cases Rocher de cette course (les cases Étoile, elles, sont fixes : voir data/piste.js).
  rochers: [7, 13, 22],

  // Dans l'ordre de jeu. position : 0 = Départ, 1 à 30 = cases. etat : null, 'tombe' ou 'elimine'.
  joueurs: [
    { id: 'j1', nom: 'Félix', bot: false, idPersonnage: 'magicien', position: 12, etat: null, points: 3 },
    { id: 'j2', nom: 'Angie', bot: false, idPersonnage: 'lievre', position: 17, etat: null, points: 1 },
    { id: 'j3', nom: 'Alec', bot: false, idPersonnage: 'centaure', position: 13, etat: 'tombe', points: 0 },
    { id: 'j4', nom: 'Alexis (GOAT)', bot: false, idPersonnage: 'banana', position: 6, etat: null, points: 0 },
  ],

  // Le joueur dont c'est le tour.
  idActif: 'j1',

  // Le tour en cours. etape : 1 à 4 (voir EtapesTour.jsx). resultatDe : null si pas encore lancé.
  // Une action avec avecValeurDe : true reçoit la valeur du dé à la fin de son libellé
  // (« Garder le » → « Garder le 2 », voir utils/textesTour.js).
  tour: {
    etape: 2,
    resultatDe: 2,
    message: 'Félix a obtenu 2. Il peut garder ce résultat ou relancer le dé grâce au pouvoir du Magicien.',
    actions: [
      { id: 'relancer', libelle: 'Relancer le dé (1 sur 2)', principal: true },
      { id: 'garder', libelle: 'Garder le', avecValeurDe: true, principal: false },
    ],
  },

  // Le plus récent en premier.
  evenements: [
    { id: 'e6', tour: 5, texte: 'Félix (Magicien) lance le dé : 2.' },
    { id: 'e5', tour: 4, texte: 'Alexis (GOAT) (Banana) avance de 3 cases, jusqu’à la case 6.' },
    { id: 'e4', tour: 4, texte: 'Alec (Centaure) s’arrête sur le rocher de la case 13 et tombe.' },
    { id: 'e3', tour: 4, texte: 'Angie (Lièvre) avance de 4 + 2 cases grâce à son pouvoir, jusqu’à la case 17.' },
    { id: 'e2', tour: 4, texte: 'Félix (Magicien) avance de 5 cases, jusqu’à la case 12.' },
    { id: 'e1', tour: 1, texte: 'La course 2 commence.' },
  ],
};

export default PARTIE_EXEMPLE;
