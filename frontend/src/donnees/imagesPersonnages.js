/*
 * imagesPersonnages.js : l'image de chaque personnage, rangée par identifiant.
 *
 * Responsabilité : relier l'id d'un personnage (personnages.js) à son fichier image (dossier assets).
 * Exemple : IMAGES_PERSONNAGES['lievre'] donne l'image du Lièvre.
 */
import banane from '../assets/images/banane.png';
import lievre from '../assets/images/Lievre.png';
import centaure from '../assets/images/centaure.png';
import flipflop from '../assets/images/flip-flop.png';
import hypnotiste from '../assets/images/hypnotiste.png';
import partyanimal from '../assets/images/party-animal.png';
import magicien from '../assets/images/magicien.png';
import scientifique from '../assets/images/ScientifiqueFusee.png';
import bouche from '../assets/images/BOUCHE.png';
import duelliste from '../assets/images/dueliste.png';

// id du personnage → image importée ci-dessus
const IMAGES_PERSONNAGES = {
  banana: banane,
  lievre,
  centaure,
  flipflop,
  hypnotiste,
  partyanimal,
  magicien,
  scientifique,
  bouche,
  duelliste,
};

export default IMAGES_PERSONNAGES;
