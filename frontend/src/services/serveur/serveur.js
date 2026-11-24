// Responsabilité : la seule porte vers le serveur (le fichier à remplir pour brancher le vrai).
// Utilisé dans : salon, scores

// demander(route)            : lire une fois. Renvoie une promesse avec les données.
// envoyer(message, donnees)  : faire une demande. Renvoie une promesse : réussie si c'est accepté, erreur si c'est refusé.
// ecouter(message, recevoir) : recevoir en direct. Renvoie une fonction pour arrêter.
//
// Pour brancher le vrai serveur, remplacer la dernière ligne par ça (après npm install socket.io-client) :
//
//   import { io } from 'socket.io-client';
//   const URL_SERVEUR = import.meta.env.VITE_URL_SERVEUR;
//   const socket = io(URL_SERVEUR);
//
//   export async function demander(route) {
//     const reponse = await fetch(URL_SERVEUR + route);
//     if (!reponse.ok) throw new Error(`Erreur ${reponse.status}`);
//     return reponse.json();
//   }
//   export async function envoyer(message, donnees) {
//     const reponse = await socket
//       .timeout(5000) // max 5 secondes
//       .emitWithAck(message, donnees)
//       .catch(() => {
//         throw new Error('Le serveur ne répond pas.');
//       });
//     if (reponse?.erreur) throw new Error(reponse.erreur.message);
//   }
//   export function ecouter(message, recevoir) {
//     socket.on(message, recevoir);
//     return () => socket.off(message, recevoir);
//   }
export { demander, envoyer, ecouter } from './simulation/serveurSimule.js';
