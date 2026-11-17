/*
 * partieExemple.js : une course en cours, inventée pour essayer l'écran de course
 * avant que le serveur et le moteur de jeu existent.
 *
 * Responsabilité : fournir des valeurs d'exemple réalistes et cohérentes entre elles
 * (positions, joueurs). Rien n'est calculé ici.
 *
 * Seuls les services (dossier services/) lisent ce fichier : les composants passent par eux.
 * Les personnages sont donnés par leur id ; le service les remplace par le personnage complet.
 *
 * Le moment choisi : course 2 sur 3, c'est au tour de Félix (Magicien) de lancer le dé.
 */
const PARTIE_EXEMPLE = {
  course: { numero: 2, nombreCourses: 3 },

  // Cases Rocher de cette course (les cases Étoile, elles, sont fixes : voir data/regles/piste.js).
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

  // Le numéro du tour en cours (les événements d'exemple s'arrêtent au tour 4).
  numeroTour: 5,

  // Le tour en cours (étape, dé, consigne, boutons) dépend du personnage du joueur actif :
  // voir data/exemples/deroulementTour.js.

  // Le journal d'événements arrive à part, au fil de la partie : voir data/exemples/evenementsExemple.js.
};

export default PARTIE_EXEMPLE;
