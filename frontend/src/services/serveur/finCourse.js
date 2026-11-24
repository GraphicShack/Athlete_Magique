// Responsabilité : la fin de course reçue du serveur, pis la demande pour continuer.

import { envoyer, ecouter } from '@/services/serveur/serveur.js';
import { creerBoite } from '@/utils/creerBoite.js';

// La dernière fin de course reçue (null si aucune).
export const finRecue = creerBoite(null);
ecouter('course:fin', finRecue.changer);

export const courseSuivante = () => envoyer('course:suivante', {});
