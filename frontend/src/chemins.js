/**
 * Adresse de chaque page, définie une seule fois.
 * Les pages s'en servent pour leurs liens (« Commencer », « Retour à l'accueil »…),
 * routes.js pour associer chaque adresse à sa page.
 *
 * Parcours du joueur : Accueil → Configuration → Course → Classement → Accueil
 * Depuis l'accueil, on peut aussi consulter les Règles.
 */
const CHEMINS = {
  accueil: '/',
  configuration: '/configuration',
  course: '/course',
  classement: '/classement',
  regles: '/regles',
};

export default CHEMINS;
