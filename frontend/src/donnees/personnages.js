/*
 * personnages.js : les 10 personnages du jeu et le texte de leur pouvoir, tels qu'affichés au joueur.
 *
 * Responsabilité : être la seule source de ces textes, réutilisée par l'accueil,
 * la sélection des personnages, la page des règles et l'écran de course.
 * Donnée d'affichage seulement : les pouvoirs sont appliqués par le moteur de jeu, pas ici.
 *
 * Chaque personnage : { id, nom, initiales, pouvoir }
 *   id         : identifiant fixe (sert à trouver son image)
 *   initiales  : affichées sur son pion, sur la piste
 */
const PERSONNAGES = [
  {
    id: 'banana',
    nom: 'Banana',
    initiales: 'BA',
    pouvoir: 'Lorsqu’un personnage me dépasse, il trébuche à la fin de son déplacement.',
  },
  {
    id: 'lievre',
    nom: 'Lièvre',
    initiales: 'LI',
    pouvoir:
      'J’ajoute 2 cases à mon déplacement principal. Toutefois, si je commence mon tour seul en tête, je saute mon déplacement principal.',
  },
  {
    id: 'centaure',
    nom: 'Centaure',
    initiales: 'CE',
    pouvoir:
      'Chaque personnage que je dépasse pendant mon déplacement recule de 2 cases, sans jamais reculer au-delà de la case Départ.',
  },
  {
    id: 'flipflop',
    nom: 'Flip Flop',
    initiales: 'FF',
    pouvoir:
      'Je peux renoncer à mon lancer de dé et échanger ma position avec celle d’un autre personnage. Cet échange est une téléportation.',
  },
  {
    id: 'hypnotiste',
    nom: 'Hypnotiste',
    initiales: 'HY',
    pouvoir: 'Avant mon déplacement principal, je peux téléporter un personnage sur ma case.',
  },
  {
    id: 'partyanimal',
    nom: 'Party Animal',
    initiales: 'PA',
    pouvoir:
      'Avant mon déplacement principal, tous les autres personnages se déplacent de 1 case vers moi. J’ajoute ensuite 1 case à mon déplacement pour chaque personnage qui partage ma case.',
  },
  {
    id: 'magicien',
    nom: 'Magicien',
    initiales: 'MA',
    pouvoir:
      'Je peux relancer le dé de mon déplacement principal jusqu’à 2 fois. Je dois conserver le résultat de mon dernier lancer.',
  },
  {
    id: 'scientifique',
    nom: 'Scientifique Fusé',
    initiales: 'SF',
    pouvoir:
      'Après mon lancer final, je peux doubler mon déplacement principal. Si je le fais, je trébuche après mon déplacement.',
  },
  {
    id: 'bouche',
    nom: 'B.O.U.C.H.E.',
    initiales: 'BO',
    pouvoir: 'Lorsque je m’arrête sur une case occupée par exactement un autre personnage, celui-ci est éliminé de la course.',
  },
  {
    id: 'duelliste',
    nom: 'Duelliste',
    initiales: 'DU',
    pouvoir:
      'Lorsqu’un autre personnage partage ma case, je peux déclarer un duel. Chacun lance un dé : le plus haut avance de 2 cases. Je gagne les égalités.',
  },
];

export default PERSONNAGES;
