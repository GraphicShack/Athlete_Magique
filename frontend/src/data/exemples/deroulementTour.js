// Responsabilité : les boutons pis les consignes de chaque étape du tour, par perso (en attendant le moteur).
// Utilisé dans : partie

// Les boutons communs à tous.
const COMMENCER = { id: 'commencer', libelle: 'Commencer le tour', principal: true, effet: 'commencer' };
const LANCER = { id: 'lancer', libelle: 'Lancer le dé', principal: true, effet: 'lancer' };
const CONFIRMER = {
  id: 'confirmer',
  libelle: 'Confirmer : avancer de',
  avecDeplacement: true,
  principal: true,
  effet: 'avancer', // sans « journal » : un déplacement sans pouvoir n'est pas journalisé
};
const FINIR = { id: 'finir', libelle: 'Fin du tour', principal: true, effet: 'terminer' };

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
        {
          id: 'hypnotiser',
          libelle: 'Téléporter un personnage',
          principal: true,
          effet: 'commencer',
          journal: 'HYPNOSE',
          parPouvoir: true,
        },
        { id: 'commencer', libelle: 'Ne pas l’utiliser', effet: 'commencer' },
      ],
    },
  },
  partyanimal: {
    debut: {
      pouvoir: true,
      consigne: 'Tous les autres personnages se rapprochent de 1 case.',
      boutons: [
        {
          id: 'rassembler',
          libelle: 'Rassembler les personnages',
          principal: true,
          effet: 'commencer',
          journal: 'RASSEMBLEMENT',
          parPouvoir: true,
        },
      ],
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
        { id: 'relancer', libelle: 'Relancer le dé', maximum: 2, principal: true, effet: 'lancer' },
        { id: 'garder', libelle: 'Garder le', avecValeurDe: true, effet: 'fixer', multiplicateur: 1, journal: 'DE_GARDE' },
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
        {
          id: 'doubler',
          libelle: 'Doubler et trébucher',
          principal: true,
          effet: 'fixer',
          multiplicateur: 2,
          journal: 'DEPLACEMENT_DOUBLE',
          parPouvoir: true,
        },
        { id: 'garder', libelle: 'Garder le', avecValeurDe: true, effet: 'fixer', multiplicateur: 1, journal: 'DE_GARDE' },
      ],
    },
  },
  flipflop: {
    lancer: {
      pouvoir: true,
      consigneAvant: 'Tu peux lancer le dé, ou y renoncer pour échanger ta place.',
      avantLancer: [
        LANCER,
        { id: 'echanger', libelle: 'Échanger de place', effet: 'allerALaFin', journal: 'ECHANGE_DEMANDE', parPouvoir: true },
      ],
      apresLancer: [],
    },
  },

  // 3. Déplacement principal.
  lievre: {
    deplacement: {
      pouvoir: true,
      consigne: 'Ton pouvoir ajoute 2 cases.',
      boutons: [
        {
          id: 'avancer',
          libelle: 'Avancer de',
          avecDeplacement: true,
          bonus: 2,
          principal: true,
          effet: 'avancer',
          journal: 'DEPLACEMENT',
          parPouvoir: true,
        },
      ],
    },
  },
  centaure: {
    deplacement: {
      pouvoir: true,
      consigne: 'Ceux que tu dépasses reculent de 2 cases.',
      boutons: [
        {
          id: 'avancer',
          libelle: 'Avancer de',
          avecDeplacement: true,
          principal: true,
          effet: 'avancer',
          journal: 'DEPLACEMENT',
          parPouvoir: true,
        },
      ],
    },
  },
};
