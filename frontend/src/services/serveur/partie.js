// Responsabilité : la course reçue du serveur, pis ce que le joueur y fait.

import { envoyer, ecouter } from '@/services/serveur/serveur.js';
import { creerBoite } from '@/utils/creerBoite.js';

// La dernière course reçue (null si aucune).
export const partieRecue = creerBoite(null);
ecouter('partie:etat', partieRecue.changer);

// Dit au serveur ce que le joueur a choisi (ex. 'LANCER').
export const faireAction = (type) => envoyer('tour:action', { type });

// Répond à la question « Veux-tu déclarer un duel ? » (accepter : true ou false).
export const repondreDuel = (id, accepter) => envoyer('duel:repondre', { id, accepter });
