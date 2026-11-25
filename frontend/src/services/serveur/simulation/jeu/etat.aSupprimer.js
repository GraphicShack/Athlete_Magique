// Responsabilité : lire pis changer l'état de la partie (chaque changement renvoie une nouvelle partie).

import { obtenirPiste } from '@/services/regles.js';

export const { nombreCases: NOMBRE_CASES, casesEtoile: CASES_ETOILE } = obtenirPiste();
export const CASE_ARRIVEE = NOMBRE_CASES + 1;

export const melanger = (liste) => [...liste].sort(() => Math.random() - 0.5);
export const lancerUnDe = () => 1 + Math.floor(Math.random() * 6);

// ---------- lire

export const trouver = (partie, id) => partie.joueurs.find((joueur) => joueur.id === id);
export const actif = (partie) => trouver(partie, partie.idActif);

// Encore sur la piste : ni arrivé, ni éliminé.
export const enCourse = ({ etat, position }) => etat !== 'elimine' && position <= NOMBRE_CASES;

export const autresEnCourse = (partie, id) => partie.joueurs.filter((joueur) => joueur.id !== id && enCourse(joueur));

// Ceux qui partagent la case de ce joueur.
export function voisins(partie, id) {
  const { position } = trouver(partie, id);
  return autresEnCourse(partie, id).filter((joueur) => joueur.position === position);
}

// Les joueurs, à partir de celui qui joue (l'ordre pour résoudre les pouvoirs).
export function ordreDepuisActif(partie) {
  const rang = partie.joueurs.findIndex(({ id }) => id === partie.idActif);
  return [...partie.joueurs.slice(rang), ...partie.joueurs.slice(0, rang)];
}

// ---------- changer

export const changerTour = (partie, changements) => ({ ...partie, tour: { ...partie.tour, ...changements } });

export const changerJoueur = (partie, id, changements) => ({
  ...partie,
  joueurs: partie.joueurs.map((joueur) => (joueur.id === id ? { ...joueur, ...changements } : joueur)),
});

// ---------- le journal

export const parPouvoir = (id) => ({ genre: 'pouvoir', id });
export const parCase = (id) => ({ genre: 'case', id });

export const noter = (partie, type, { acteur = partie.idActif, cible = null, cause = null, details = {} } = {}) => ({
  ...partie,
  journal: [
    ...partie.journal,
    {
      id: `e${partie.journal.length + 1}`,
      course: partie.course.numero,
      tour: partie.tour.numero,
      etape: partie.tour.etape,
      type,
      acteur,
      cible,
      cause,
      details,
    },
  ],
});
