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
import PERSONNAGES from '@/data/personnages.js';
import IMAGES_PERSONNAGES from '@/data/imagesPersonnages.js';

// La liste des personnages : [{ id, nom, initiales, pouvoir }, …]
export function obtenirPersonnages() {
  return PERSONNAGES;
}

// L'image d'un personnage, à partir de son id (undefined si on ne la connaît pas).
export function imagePersonnage(id) {
  return IMAGES_PERSONNAGES[id];
}
