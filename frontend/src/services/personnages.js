/*
 * personnages.js (service) : le seul endroit où les composants vont chercher les personnages.
 *
 * Responsabilité : fournir les personnages et leurs images aux composants, sans qu'ils
 * sachent d'où viennent les données.
 *
 * Aujourd'hui, les données viennent du dossier data/ (valeurs d'exemple) et sont
 * renvoyées tout de suite (de façon synchrone).
 * Plus tard, le serveur fournira les personnages tirés au hasard pour la partie. Il faudra
 * alors changer ce fichier (appel réseau), mais aussi les composants : la réponse arrivera
 * après un délai (asynchrone), et ils devront afficher un chargement et gérer les erreurs.
 * Ce qui ne changera pas : les composants passeront toujours par ce service, jamais
 * directement par data/ ou par le réseau.
 */
import PERSONNAGES from '@/data/personnages/personnages.js';
import IMAGES_PERSONNAGES from '@/data/personnages/imagesPersonnages.js';

// La liste des personnages, chacun avec son image : [{ id, nom, initiales, pouvoir, image }, …]
// Les composants n'ont donc pas besoin de chercher l'image eux-mêmes.
const PERSONNAGES_AVEC_IMAGE = PERSONNAGES.map((personnage) => ({
  ...personnage,
  image: IMAGES_PERSONNAGES[personnage.id],
}));

export function obtenirPersonnages() {
  return PERSONNAGES_AVEC_IMAGE;
}
