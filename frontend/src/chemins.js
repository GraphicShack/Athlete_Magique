/*
 * chemins.js : l'adresse de chaque page, écrite une seule fois.
 *
 * Responsabilités :
 *   - fournir les adresses aux liens des pages (« Commencer », « Retour à l'accueil »…) ;
 *   - fournir les adresses au routeur (routes.jsx).
 * Changer une adresse ici la change partout.
 *
 * Parcours du joueur : Accueil → Configuration → Sélection → Course → Classement → Accueil.
 * Les Règles sont accessibles depuis toutes les pages.
 */
const CHEMINS = {
  accueil: '/',
  configuration: '/configuration',
  selection: '/selection',
  course: '/course',
  classement: '/classement',
  regles: '/regles',
};

export default CHEMINS;
