// Responsabilité : la sélection reçue du serveur, pis le choix du joueur.

import { envoyer, ecouter } from '@/services/serveur/serveur.js';
import { creerBoite } from '@/utils/creerBoite.js';

// La dernière sélection reçue (null si aucune).
export const selectionRecue = creerBoite(null);
ecouter('selection:etat', selectionRecue.changer);

export const choisirPersonnage = (idPersonnage) => envoyer('selection:choisir', { idPersonnage });
