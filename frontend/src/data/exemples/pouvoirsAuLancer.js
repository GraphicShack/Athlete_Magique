/*
 * pouvoirsAuLancer.js : les boutons du tour en cours pour chaque personnage, en attendant le
 * moteur de jeu. Seuls 3 personnages ont un choix à faire au lancer de dé (Magicien,
 * Scientifique Fusé, Flip Flop) ; les autres reçoivent LANCER_SIMPLE (en bas).
 *
 * Responsabilité : fournir les boutons et les consignes de chaque phase du lancer.
 * Rien n'est calculé ici : ce sont des valeurs d'exemple.
 *
 * Seul le service partie.js lit ce fichier.
 *
 * Le tour se fait en 3 phases (voir hooks/tour/useTourDemo.js) :
 *   1. avant le lancer : boutons avantLancer (toujours « Lancer le dé », parfois un autre choix) ;
 *   2. après le lancer : boutons apresLancer, s'il y en a (le pouvoir à utiliser) ;
 *   3. commune à tous : « Avancer de N », ajouté par utils/tour/boutonsTour.js.
 *
 * Champs :
 *   consigneAvant : message avant le lancer
 *   consigneApres : message après le lancer, pendant le choix du pouvoir (s'il y en a un)
 *   avantLancer   : boutons de la phase 1
 *   apresLancer   : boutons de la phase 2 (vide : on passe directement à « Avancer »)
 *
 * Options d'un bouton :
 *   principal    : bouton rouge (sinon blanc)
 *   avecValeurDe : ajoute la valeur du dé au libellé (« Garder le » → « Garder le 4 »)
 *   maximum      : nombre d'utilisations permises (ex. 2 relances du Magicien) ; le bouton
 *                  affiche « (1 sur 2) » et devient inactif une fois le maximum atteint
 */

// Le bouton du premier lancer, commun à tous.
const LANCER = { id: 'lancer', libelle: 'Lancer le dé', principal: true };

const POUVOIRS_AU_LANCER = {
  // Peut relancer jusqu'à 2 fois, puis doit garder le dernier résultat.
  magicien: {
    consigneAvant: 'Lance le dé. Tu pourras ensuite le relancer jusqu’à 2 fois.',
    consigneApres: 'Tu peux garder ce résultat ou relancer le dé.',
    avantLancer: [LANCER],
    apresLancer: [
      { id: 'relancer', libelle: 'Relancer le dé', maximum: 2, principal: true },
      { id: 'garder', libelle: 'Garder le', avecValeurDe: true },
    ],
  },

  // Après le lancer final, peut doubler son déplacement, mais trébuche ensuite.
  scientifique: {
    consigneAvant: 'Lance le dé. Tu pourras ensuite doubler ton déplacement.',
    consigneApres: 'Tu peux doubler ton déplacement, mais tu trébucheras ensuite.',
    avantLancer: [LANCER],
    apresLancer: [
      { id: 'doubler', libelle: 'Doubler et trébucher', principal: true },
      { id: 'garder', libelle: 'Garder le', avecValeurDe: true },
    ],
  },

  // Avant de lancer : lancer le dé normalement, ou y renoncer pour échanger sa place.
  flipflop: {
    consigneAvant: 'Tu peux lancer le dé, ou y renoncer pour échanger ta place avec un autre personnage.',
    avantLancer: [LANCER, { id: 'echanger', libelle: 'Échanger de place' }],
    apresLancer: [],
  },
};

// Le tour d'un personnage sans pouvoir au lancer : « Lancer le dé », puis « Avancer de N ».
export const LANCER_SIMPLE = {
  consigneAvant: 'Lance le dé pour avancer.',
  avantLancer: [LANCER],
  apresLancer: [],
};

export default POUVOIRS_AU_LANCER;
