// Responsabilité : la fin de course reçue du serveur, pis les demandes autour.
// Utilisé dans : ProchaineCourse, partie, useFinCourse, useSuivreFinCourse, useTourDemo

import { envoyer, ecouter } from '@/services/serveur/serveur.js';
import { creerBoite } from '@/utils/creerBoite.js';

// La dernière fin de course reçue (null si aucune).
export const finRecue = creerBoite(null);
ecouter('course:fin', finRecue.changer);

export const finirTour = () => envoyer('tour:action', { type: 'FINIR_TOUR' });
export const courseSuivante = () => envoyer('course:suivante', {});
