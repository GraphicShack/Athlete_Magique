// Responsabilité : transforme la sélection reçue en ce que l'écran affiche.

import { obtenirPersonnage } from '@/services/personnages.js';

// Renvoie les persos tirés (prisPar : le joueur qui l'a, ou null), mes persos, celui qui choisit (null = fini), pis aMoi.
export function lireSelection({ idMoi, idChoisit, joueurs, personnagesTires, choix }) {
  const trouverJoueur = (id) => joueurs.find((joueur) => joueur.id === id) ?? null;

  const personnages = personnagesTires.map((id) => {
    const choixFait = choix.find(({ idPersonnage }) => idPersonnage === id);
    return { ...obtenirPersonnage(id), prisPar: trouverJoueur(choixFait?.idJoueur) };
  });

  return {
    personnages,
    mesPersonnages: personnages.filter(({ prisPar }) => prisPar?.id === idMoi),
    choisit: trouverJoueur(idChoisit),
    aMoi: idChoisit === idMoi,
  };
}
