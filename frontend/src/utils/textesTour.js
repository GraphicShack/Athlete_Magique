/*
 * textesTour.js : petites fonctions qui préparent les textes du tour en cours à partir du lancer de dé.
 *
 * Responsabilité : écrire le message du tour et les libellés des boutons, pour que les
 * composants n'aient qu'à les afficher. Aucune règle de jeu ici, seulement du texte.
 */

/**
 * Le message du tour :
 *   - avant tout lancer : le message prévu (messageDepart) ;
 *   - pendant que le dé roule : « Le dé roule… » ;
 *   - une fois le dé arrêté : « Félix a obtenu 4. »
 */
export function messageLancer({ messageDepart, joueur, lancers, obtenu }) {
  if (lancers === 0) return messageDepart;
  if (obtenu === null) return 'Le dé roule…';
  return `${joueur} a obtenu ${obtenu}.`;
}

/**
 * Les boutons du tour, avec la valeur du dé ajoutée au libellé de ceux qui la demandent
 * (avecValeurDe : true), ex. « Garder le » → « Garder le 4 ».
 * Pendant que le dé roule (obtenu null), les libellés restent tels quels.
 */
export function actionsAvecValeur(actions, obtenu) {
  return actions.map((action) =>
    action.avecValeurDe && obtenu !== null ? { ...action, libelle: `${action.libelle} ${obtenu}` } : action
  );
}
