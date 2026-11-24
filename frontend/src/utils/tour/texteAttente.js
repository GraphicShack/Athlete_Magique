// Responsabilité : le texte affiché pendant le tour d'un autre.

// joueur (son nom), bot (true = c'est un bot), blague (true = on troll, seulement pour un bot).
export function texteAttente({ joueur, bot, blague }) {
  if (!bot) return `${joueur} complète son tour.`;
  if (blague) return 'Je sais où tu vis lol';
  return `Le joueur ${joueur} complète son tour.`;
}
