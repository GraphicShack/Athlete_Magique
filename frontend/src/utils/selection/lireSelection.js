// Responsabilité : transforme la sélection reçue en ce que l'écran affiche.

import { obtenirPersonnage } from '@/services/personnages.js';

// Renvoie les persos tirés (prisPar : le joueur qui l'a, ou null ; choisiParMoi), mes persos, celui qui choisit (null = fini), pis monTour.
export function lireSelection({ idMoi, idChoisit, joueurs, personnagesTires, choix }) {
  const trouverJoueur = (id) => joueurs.find((joueur) => joueur.id === id) ?? null;

  const personnages = personnagesTires.map((id) => {
    const choixFait = choix.find(({ idPersonnage }) => idPersonnage === id);
    const prisPar = trouverJoueur(choixFait?.idJoueur);
    return { ...obtenirPersonnage(id), prisPar, choisiParMoi: prisPar?.id === idMoi };
  });

  return {
    personnages,
    mesPersonnages: personnages.filter(({ choisiParMoi }) => choisiParMoi),
    choisit: trouverJoueur(idChoisit),
    monTour: idChoisit === idMoi,
  };
}
