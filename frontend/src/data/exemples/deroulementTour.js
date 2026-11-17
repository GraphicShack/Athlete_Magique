/*
 * deroulementTour.js : les boutons et les consignes de chaque étape du tour, pour chaque
 * personnage, en attendant le moteur de jeu. Rien n'est calculé ici.
 *
 * Seul le service partie.js lit ce fichier.
 *
 * Les 4 étapes du tour (voir EtapesTour.jsx) :
 *   debut       : 1. Début du tour
 *   lancer      : 2. Lancer du dé
 *   deplacement : 3. Déplacement principal
 *   fin         : 4. Fin du tour
 *
 * TOUR_PAR_DEFAUT : un personnage sans pouvoir à cette étape (un seul bouton).
 * POUVOIRS_PAR_ETAPE : seulement les étapes où un personnage a un pouvoir à utiliser.
 *   Exemple : le Magicien n'a que « lancer » ; pour les 3 autres étapes, il prend le défaut.
 *
 * Champs d'une étape :
 *   pouvoir   : true si le pouvoir du personnage s'utilise à cette étape (encadré « Pouvoir »)
 *   consigne  : message de l'étape
 *   boutons   : les boutons de l'étape
 * L'étape « lancer » a deux moments, avant et après le lancer :
 *   consigneAvant, avantLancer : avant le lancer ;
 *   consigneApres, apresLancer : après le lancer (vide : on passe directement au déplacement).
 *
 * Options d'un bouton :
 *   principal       : bouton rouge (sinon blanc)
 *   avecValeurDe    : ajoute la valeur du dé au libellé (« Garder le » → « Garder le 4 »)
 *   avecDeplacement : ajoute le nombre de cases au libellé (« Avancer de » → « Avancer de 4 »)
 *   bonus           : cases ajoutées au déplacement (ex. +2 du Lièvre)
 *   maximum         : nombre d'utilisations permises (ex. 2 relances du Magicien)
 */

// Les boutons communs à tous.
const COMMENCER = { id: 'commencer', libelle: 'Commencer le tour', principal: true };
const LANCER = { id: 'lancer', libelle: 'Lancer le dé', principal: true };
const CONFIRMER = { id: 'confirmer', libelle: 'Confirmer : avancer de', avecDeplacement: true, principal: true };
const FINIR = { id: 'finir', libelle: 'Fin du tour', principal: true };

export const TOUR_PAR_DEFAUT = {
  debut: { consigne: 'C’est ton tour. Commence quand tu es prêt.', boutons: [COMMENCER] },
  lancer: { consigneAvant: 'Lance le dé pour avancer.', avantLancer: [LANCER], apresLancer: [] },
  deplacement: { consigne: 'Confirme ton déplacement.', boutons: [CONFIRMER] },
  fin: { consigne: 'Ton déplacement est fait. Termine ton tour.', boutons: [FINIR] },
};

export const POUVOIRS_PAR_ETAPE = {
  // 1. Début du tour : avant le déplacement principal.
  hypnotiste: {
    debut: {
      pouvoir: true,
      consigne: 'Tu peux téléporter un personnage sur ta case.',
      boutons: [
        { id: 'hypnotiser', libelle: 'Téléporter un personnage', principal: true },
        { id: 'commencer', libelle: 'Ne pas l’utiliser' },
      ],
    },
  },
  partyanimal: {
    debut: {
      pouvoir: true,
      consigne: 'Tous les autres personnages se rapprochent de 1 case.',
      boutons: [{ id: 'rassembler', libelle: 'Rassembler les personnages', principal: true }],
    },
  },

  // 2. Lancer du dé.
  magicien: {
    lancer: {
      pouvoir: true,
      consigneAvant: 'Lance le dé. Tu pourras ensuite le relancer jusqu’à 2 fois.',
      consigneApres: 'Tu peux garder ce résultat ou relancer le dé.',
      avantLancer: [LANCER],
      apresLancer: [
        { id: 'relancer', libelle: 'Relancer le dé', maximum: 2, principal: true },
        { id: 'garder', libelle: 'Garder le', avecValeurDe: true },
      ],
    },
  },
  scientifique: {
    lancer: {
      pouvoir: true,
      consigneAvant: 'Lance le dé. Tu pourras ensuite doubler ton déplacement.',
      consigneApres: 'Tu peux doubler ton déplacement, mais tu trébucheras ensuite.',
      avantLancer: [LANCER],
      apresLancer: [
        { id: 'doubler', libelle: 'Doubler et trébucher', principal: true },
        { id: 'garder', libelle: 'Garder le', avecValeurDe: true },
      ],
    },
  },
  flipflop: {
    lancer: {
      pouvoir: true,
      consigneAvant: 'Tu peux lancer le dé, ou y renoncer pour échanger ta place.',
      avantLancer: [LANCER, { id: 'echanger', libelle: 'Échanger de place' }],
      apresLancer: [],
    },
  },

  // 3. Déplacement principal.
  lievre: {
    deplacement: {
      pouvoir: true,
      consigne: 'Ton pouvoir ajoute 2 cases.',
      boutons: [{ id: 'avancerLievre', libelle: 'Avancer de', avecDeplacement: true, bonus: 2, principal: true }],
    },
  },
  centaure: {
    deplacement: {
      pouvoir: true,
      consigne: 'Ceux que tu dépasses reculent de 2 cases.',
      boutons: [{ id: 'avancerCentaure', libelle: 'Avancer de', avecDeplacement: true, principal: true }],
    },
  },
};
