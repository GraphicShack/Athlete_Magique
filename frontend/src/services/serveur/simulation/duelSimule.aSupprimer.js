// Responsabilité : fait semblant de gérer un duel (pour essayer la fenêtre).

// Pour essayer : /course?duel (c'est moi le Duelliste) ou /course?duel=autre (c'est Angie).
const duelDemande = new URLSearchParams(window.location.search).get('duel');

const lancerDe = () => 1 + Math.floor(Math.random() * 6);

// Met les 2 joueurs sur la même case, pis ouvre le duel si on l'a demandé dans l'adresse.
export function ajouterDuel(partie) {
  if (duelDemande === null) return partie;
  const [idDuelliste, idCible] = duelDemande === 'autre' ? ['j2', 'j1'] : ['j1', 'j2'];
  return {
    ...partie,
    duel: { id: 'd1', idDuelliste, idCible, valeurs: null, gagnant: null },
    joueurs: partie.joueurs.map((joueur) => ({
      ...joueur,
      ...(joueur.id === idDuelliste && { idPersonnage: 'duelliste' }),
      ...([idDuelliste, idCible].includes(joueur.id) && { position: 12 }),
    })),
  };
}

// La réponse du Duelliste : pas de duel, ou on lance les 2 dés (il gagne les égalités).
export function repondreAuDuel(partie, accepter) {
  if (!accepter) return { ...partie, duel: null };
  const { idDuelliste, idCible } = partie.duel;
  const valeurs = { [idDuelliste]: lancerDe(), [idCible]: lancerDe() };
  const gagnant = valeurs[idDuelliste] >= valeurs[idCible] ? idDuelliste : idCible;
  return { ...partie, duel: { ...partie.duel, valeurs, gagnant } };
}

// Le gagnant avance de 2 cases, pis le duel est fini.
export function finirDuel(partie) {
  const avancer = (joueur) => (joueur.id === partie.duel.gagnant ? { ...joueur, position: joueur.position + 2 } : joueur);
  return { ...partie, duel: null, joueurs: partie.joueurs.map(avancer) };
}
