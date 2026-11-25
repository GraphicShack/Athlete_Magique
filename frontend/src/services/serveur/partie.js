// Responsabilité : la course reçue du serveur, pis ce que le joueur y fait.

import { envoyer, ecouter } from '@/services/serveur/serveur.js';
import { creerBoite } from '@/utils/creerBoite.js';

// La dernière course reçue (null si aucune).
export const partieRecue = creerBoite(null);
ecouter('partie:etat', partieRecue.changer);

// Dit au serveur ce que le joueur a choisi (ex. 'LANCER'), pis sur qui s'il y a une cible.
export const faireAction = (type, cible) => envoyer('tour:action', { type, cible });

// Répond à la question « Veux-tu déclarer un duel ? » (accepter : true ou false).
export const repondreDuel = (id, accepter) => envoyer('duel:repondre', { id, accepter });
